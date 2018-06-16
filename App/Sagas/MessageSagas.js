import { select, put, fork, call, takeLatest, all } from 'redux-saga/effects'
import DirectionActions, { DirectionTypes } from '../Redux/DirectionRedux'
import { UserSelectors } from '../Redux/UserRedux'
import { rsf, firestore } from '../Services/ReduxSagaFirebase';
import { GeoLocationSelectors } from '../Redux/GeoLocationRedux';
import { StoreSelectors } from '../Redux/StoreRedux';
import Polyline from '@mapbox/polyline'
import firebase from 'react-native-firebase'
import R from 'ramda'
import MessageActions, { MessageTypes, MessageSelectors } from '../Redux/MessageRedux';
import { FirestoreFlat, MessagesFlat } from '../Transforms';

function * sendMessage({ data, storeId }) {
  for (const message of data) {
    const users = {}
    users[storeId] = true
    users[message.user._id] = true

    const checkMessageExists = yield call(
      rsf.firestore.getDocument,
      firestore.collection('messages')
        .where(`users.${storeId}`, '==', true)
        .where(`users.${message.user._id}`, '==', true)
    )

    let messageId = null
    if (checkMessageExists.empty) {
      const messagePath = yield call(
        rsf.firestore.addDocument,
        'messages',
        { users },
        { merge: true }
      )

      messageId = messagePath.id
    } else {
      messageId = checkMessageExists.docs[0].id
    }


    const messageDetailPath = yield call(
      rsf.firestore.addDocument,
      `messages/${messageId}/messageDetail`,
      { ...message, createdAt: firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )
  }
}

function* syncDetail({ userList, keys }) {
  const userInfo = yield select(UserSelectors.getUser)
  const userListInfo = yield select(MessageSelectors.getUserInfo)
  let index = 0

  for (const user of userList) {
    const key = keys[index]
    const snapshotStore = yield call(rsf.firestore.getDocument, `users/${user}`);
    const storeInfo = {
      uid: snapshotStore.id,
      ...snapshotStore.data()
    }

    if (userListInfo[user] === undefined) {
      yield put(MessageActions.storeUserInfo(storeInfo, user))
    }

    yield fork(
      rsf.firestore.syncCollection,
      firestore.collection('messages')
        .doc(key).collection('messageDetail')
        .orderBy('createdAt', 'desc'),
      {
        successActionCreator: snapshot => {
          const messages = MessagesFlat(snapshot, storeInfo, userInfo)

          return MessageActions.syncDetail(messages, user)
        }
      }
    )

    index++
  }
}

function* syncMessages() {
  const user = yield select(UserSelectors.getUser)

  if (user) {
    yield fork(
      rsf.firestore.syncCollection,
      firestore.collection('messages').where(`users.${user.uid}`, '==', true),
      {
        successActionCreator: snapshot => {
          const keys = []
          const messages = []

          FirestoreFlat(snapshot).map(item => {
            const receiverId = R.dissoc(user.uid, item.users)

            keys.push(item.key)
            messages.push(...R.keys(receiverId))
          })

          return MessageActions.syncSuccess(messages, keys)
        }
      }
    )
  } else {
    console.log('Message sync stopped, no user logged in')
  }
}

export default function* messageSagas() {
  yield all([
    takeLatest(MessageTypes.SYNC, syncMessages),
    takeLatest(MessageTypes.SYNC_SUCCESS, syncDetail),
    takeLatest(MessageTypes.SEND_MESSAGE, sendMessage),
  ])
}
