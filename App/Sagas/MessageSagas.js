import R from 'ramda';
import firebase from 'react-native-firebase';
import { all, call, select, takeLatest } from 'redux-saga/effects';
import { MessageTypes } from '../Redux/MessageRedux';
import { UserSelectors } from '../Redux/UserRedux';
import { rsf } from '../Services/ReduxSagaFirebase';

export function* sendMessage({ data, messageId, storeId, storeName }) {
  const userData = yield select(UserSelectors.getUser)
  const allMessages = yield select(UserSelectors.getMessages)

  const message = data[0]

  if (messageId == null) {
    const messagePath = R.find(R.propEq('uid', storeId))(allMessages)

    if (messagePath == undefined) {
      const data = {
        [userData.uid]: userData.name,
        [storeId]: storeName
      }

      const newDocument = yield call(
        rsf.firestore.addDocument,
        'messages',
        data
      )

      messageId = newDocument.id
    } else {
      messageId = messagePath.messageId
    }
  }

  yield call(
      rsf.firestore.addDocument,
      `messages/${messageId}/messageDetail`,
      { ...message, createdAt: firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )
}
