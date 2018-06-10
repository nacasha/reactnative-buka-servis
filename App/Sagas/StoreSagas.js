import { put, call, all } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import StoreActions from '../Redux/StoreRedux'
import R from 'ramda'
import FirestoreFlat from '../Transforms/FirestoreFlat';

// Get available services from selected store
export function* fetchServices(storeId) {
  let response = null

  yield firebase.firestore()
    .collection('services').where('user', '==', storeId).get()
    .then(doc => {
      response = FirestoreFlat(doc)
    })

  response = yield all(response.map(item => R.dissoc('userRef', item)))

  return response
}

// Get total favorites from selected store
export function* fetchFavorites(storeId) {
  const store = R.replace(/\./g, '_', storeId)
  let response = null

  yield firebase.firestore()
    .collection('favorites').where(store, '==', true).get()
    .then(doc => {
      response = FirestoreFlat(doc)
    })

  return response
}

export function* fetchStoreDetail(action) {
  const { storeId } = action

  const favorites = yield call(fetchFavorites, storeId)
  const services = yield call(fetchServices, storeId)

  const data = { favorites, services }

  yield put(StoreActions.storeSuccess(data, storeId))
}
