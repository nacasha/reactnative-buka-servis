import { eventChannel, END } from 'redux-saga'
import { put, call, take, fork, select, all } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import UserActions, { UserSelectors } from '../Redux/UserRedux'
import AuthActions from '../Redux/AuthRedux'
import { rsf, firestore } from '../Services/ReduxSagaFirebase'
import { FirestoreFlat } from '../Transforms';
import R from 'ramda'
import { startSubmit, stopSubmit } from 'redux-form'

// -------------------------------------------------------------
// -------------------------------------------------------------
// Global Variables

let syncChannel = {}
let messageChannel = {}

// -------------------------------------------------------------
// -------------------------------------------------------------

const fetchContacts = (userId) => fork(
  rsf.firestore.syncDocument,
  firestore.collection('users').doc(userId).collection('contacts'),
  {
    transform: FirestoreFlat,
    successActionCreator: snapshot => (
        UserActions.syncUserDataSuccess('contacts', snapshot)
    )
  }
)

const fetchFavorites = (userId) => fork(
  rsf.firestore.syncDocument,
  firestore.collection('favorites').doc(userId),
  {
    successActionCreator: snapshot => {
      let value = snapshot.data()
      if (value == undefined) {
        value = {}
      }

      return UserActions.syncUserDataSuccess('favorites', value)
    }
  }
)

const fetchServices = (userId) => fork(
  rsf.firestore.syncDocument,
  firestore.collection('services').where('user', '==', userId),
  {
    transform: FirestoreFlat,
    successActionCreator: snapshot => (
      UserActions.syncUserDataSuccess('services', snapshot)
    )
  }
)

const fetchMessages = (userId) => fork(
  rsf.firestore.syncDocument,
  firestore.collection('messages').where(userId, '>', ''),
  {
    successActionCreator: snapshot => {
      let messages = []

      FirestoreFlat(snapshot).map(item => {
        const { key, lastMessage, lastTimestamp, ...users } = item

        const messageId = key

        const receiver = R.omit([userId, 'key'], users)
        const uid = R.keys(receiver).toString()
        const name = R.values(receiver).toString()

        messages.push({ messageId, uid, name, lastMessage, lastTimestamp })
      })

      return UserActions.syncUserMessageSuccess('messages', messages)
    }
  }
)

// -------------------------------------------------------------
// -------------------------------------------------------------

const fetchDetail = (messageId, uid) => fork(
  rsf.firestore.syncDocument,
  firestore.collection('messages')
  .doc(messageId).collection('messageDetail')
  .orderBy('createdAt', 'desc'),
  {
    successActionCreator: snapshot => {
      const messages = FirestoreFlat(snapshot)

      return UserActions.syncUserMessageDetails(uid, messages)
    }
  }
)

export function * fetchMessagesDetail() {
  const messages = yield select(UserSelectors.getMessages)

  for (const { messageId, uid } of messages) {
    messageChannel[messageId] = yield fetchDetail(messageId, uid)
  }
}

// -------------------------------------------------------------
// -------------------------------------------------------------

export function* updateProfile({ payload }) {
  const { data, onSuccess } = payload
  const userId = yield select(UserSelectors.getUserId)

  const newValues = R.dissocPath(['location', 'open'], data)

  try {
    yield put(startSubmit('profile'))

    yield call(
      rsf.firestore.setDocument,
      `users/${userId}`,
      newValues,
      { merge: true }
    )

    yield put(UserActions.updateSuccess(newValues))
    onSuccess()
  }
  catch (error) {
    yield put(UserActions.updateFailure(error))
  }
  finally {
    yield put(stopSubmit('profile'))
  }
}

// -------------------------------------------------------------
// -------------------------------------------------------------

/**
 * Check auth state on changed
 */
function* onAuthStateChanged() {
  return eventChannel(emit => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      snapshot => emit(snapshot || false)
    )

    return unsubscribe
  })
}

/**
 * Sync all user's data on firestore
 */
export function* syncUserData() {
  const authState = yield call(onAuthStateChanged)

  while (true) {
    const user = yield take(authState)

    if (user && user.emailVerified) {
      yield isAlreadyLoggedIn = yield select(UserSelectors.getLoginStatus)

      if (isAlreadyLoggedIn === false) {
        const userInfo = yield call(
          rsf.firestore.getCollection,
          firestore.collection('users').doc(user.uid)
        )

        const userData = R.merge(user._user, userInfo.data())
        yield put(UserActions.storeUserData(userData))
        yield put(AuthActions.successSignin())
      }

      syncChannel.favorites = yield fetchFavorites(user.uid)
      syncChannel.services = yield fetchServices(user.uid)
      syncChannel.contacts = yield fetchContacts(user.uid)
      syncChannel.messages = yield fetchMessages(user.uid)
    } else {
      if (Object.keys(syncChannel).length > 0) {
        syncChannel.favorites.cancel()
        syncChannel.services.cancel()
        syncChannel.contacts.cancel()
        syncChannel.messages.cancel()

        Object.keys(messageChannel).map(id => {
          const channel = messageChannel[id]

          channel.cancel()
        })

        yield put(UserActions.resetUserData())
      }
    }
  }
}
