import { put, call, all } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import FeedActions from '../Redux/FeedRedux'

export function* getUserData(userRef) {
  let response = null
  yield userRef.get().then(doc => {
    response = { ...doc.data(), email: doc.id }
  })

  return response
}

export function* feedsRequest(action) {
  let state = {
    ok: false,
    response: null
  }

  yield firebase.firestore()
    .collection('services').get()
    .then(response => state = { ok: true, response })
    .catch(response => state = { ok: false, response })

  if (state.ok) {
    const feeds = yield all(state.response.docs.map(function* (item) {
      const userRef = yield call(getUserData, item.data().userRef)
      const key = item.id

      return { key, ...item.data(), user: userRef, userRef }
    }))

    yield put(FeedActions.feedSuccess(feeds))
  } else {
    yield put(FeedActions.feedFailure(state.response))
  }
}
