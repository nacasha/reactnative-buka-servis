import { eventChannel } from 'redux-saga'
import { select, put, call, take, all } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import ServiceActions from '../Redux/ServiceRedux'
import { UserSelectors } from '../Redux/UserRedux'
import FirestoreFlat from '../Transforms/FirestoreFlat';
import R from 'ramda'

function sync(userID) {
  const ref = firebase.firestore()
    .collection('services').where('user', '==', userID)

  return eventChannel(emit => {
    const unsubscribe = ref.onSnapshot(snapshot => emit(snapshot))

    return unsubscribe
  })
}

export function* fetchService(action) {
  const userId = yield select(UserSelectors.getUserId)
  const channel = yield call(sync, userId)

  try {
    while (true) {
      let data = yield take(channel)

      let docs = FirestoreFlat(data)
      docs = yield all(docs.map(item => R.dissoc('userRef', item)))
      yield put(ServiceActions.fetchSuccess(docs))
    }
  } finally {
    console.log('Unable to fetch data from firebase')
  }
}

export function* addService(action) {
  const user = yield select(UserSelectors.getUserId)
  let state = {
    ok: false,
    response: null
  }

  const createdAt = firebase.firestore.FieldValue.serverTimestamp()

  yield firebase.firestore()
    .collection('services').add({
      ...action.data, user, createdAt
    })
    .then(response => state = { ok: true, response })
    .catch(response => state = { ok: false, response })

  if (state.ok) {
    yield put(ServiceActions.serviceSuccess(state.response))
  } else {
    yield put(ServiceActions.serviceFailure(state.response))
  }
}

export function* updateService(action) {
  const { data, serviceId } = action
  let state = {
    ok: false,
    response: null
  }

  yield firebase.firestore()
    .collection('services').doc(serviceId).update({
      ...data
    })
    .then(response => state = { ok: true, response })
    .catch(response => state = { ok: false, response })

  if (state.ok) {
    yield put(ServiceActions.serviceSuccess(state.response))
  } else {
    yield put(ServiceActions.serviceFailure(state.response))
  }
}

export function* deleteService(action) {
  const { serviceId } = action
  let state = {
    ok: false,
    response: null
  }

  yield firebase.firestore()
    .collection('services').doc(serviceId).delete()
    .then(response => state = { ok: true, response })
    .catch(response => state = { ok: false, response })

  if (state.ok) {
    yield put(ServiceActions.serviceSuccess(state.response))
  } else {
    yield put(ServiceActions.serviceFailure(state.response))
  }
}
