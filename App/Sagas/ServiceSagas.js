import { eventChannel } from 'redux-saga'
import { select, put, call, take, all } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import ServiceActions from '../Redux/ServiceRedux'
import { UserSelectors } from '../Redux/UserRedux'
import FirestoreFlat from '../Transforms/FirestoreFlat';

function sync(user) {
  const ref = firebase.firestore().collection('services').where('user', '==', user)

  return eventChannel(emit => {
    const unsubscribe = ref.onSnapshot(snapshot => emit(snapshot))

    return unsubscribe
  })
}

export function* fetchService(action) {
  const user = yield select(UserSelectors.getEmail)
  const channel = yield call(sync, user)

  try {
    while (true) {
      let data = yield take(channel)
      const docs = FirestoreFlat(data)
      yield put(ServiceActions.fetchSuccess(docs))
    }
  } finally {
    console.log('Unable to fetch data from firebase')
  }
}

export function* addService(action) {
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

export function* updateService(action) {
  const { data, serviceId } = action
  let state = {
    ok: false,
    response: null
  }

  console.log(serviceId)

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
