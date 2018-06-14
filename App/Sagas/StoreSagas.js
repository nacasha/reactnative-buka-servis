import { fork, put, call, all, takeLatest } from 'redux-saga/effects'
import StoreActions, { StoreTypes } from '../Redux/StoreRedux'
import FirestoreFlat from '../Transforms/FirestoreFlat';
import { rsf, firestore } from '../Services/ReduxSagaFirebase';
import { getFeedRating } from './FeedSagas';

// Get available services from selected store
function* fetchStoreServices(storeId) {
  const servicesData = yield call(
    rsf.firestore.getCollection,
    firestore.collection('services').where('user', '==', storeId)
  )

  const services = yield all(servicesData.docs.map(function* (item) {
    // fetch rating data from firebase
    const key = item.id
    const rating = yield call(getFeedRating, key)

    return { ...item.data(), ...rating, key }
  }))

  return services
}

// Get total favorites from selected store
function* syncStoreFavorites(storeId) {
  yield fork(
    rsf.firestore.syncCollection,
    firestore.collection('favorites').where(storeId, '==', true),
    {
      successActionCreator: snapshot => {
        const favorites = FirestoreFlat(snapshot)

        return StoreActions.storeSuccess({ favorites }, storeId)
      }
    }
  )
}

function* fetchStoreData(action) {
  const { storeId } = action

  const services = yield call(fetchStoreServices, storeId)
  const data = { services }

  yield put(StoreActions.storeSuccess(data, storeId))
  yield syncStoreFavorites(storeId)
}

export default function* storeSagas() {
  yield all([
    takeLatest(StoreTypes.FETCH_STORE_DATA, fetchStoreData),
  ])
}
