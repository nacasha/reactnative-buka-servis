import { select, put } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import ServiceActions from '../Redux/ServiceRedux'
import { UserSelectors } from '../Redux/UserRedux'

export function* fetch(action) {
  const user = yield select(UserSelectors.getEmail)
  let state = {
    ok: false,
    response: null
  }

  doc = firebase.firestore().collection('services').where('user', '==', user)

  observer = doc.onSnapshot(docSnapshot => {
    console.log(`Received doc snapshot: ${docSnapshot}`);
  }, err => {
    console.log(`Encountered error: ${err}`);
  });

}

export function* add(action) {
  const user = yield select(UserSelectors.getEmail)
  let state = {
    ok: false,
    response: null
  }

  yield firebase.firestore()
    .collection('services').add({
      ...action.data, user
    })
    .then(response => state = { ok: true, response })
    .catch(response => state = { ok: false, response })

  if (state.ok) {
    yield put(ServiceActions.serviceSuccess(state.response))
  } else {
    yield put(ServiceActions.serviceFailure(state.response))
  }
}

