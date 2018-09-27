import { startSubmit, stopSubmit } from 'redux-form';
import { call, put, select, take, throttle, takeLatest } from 'redux-saga/effects';
import { delay, eventChannel, END } from 'redux-saga';
import SearchActions, { SearchSelectors } from '../Redux/SearchRedux';
import StoreActions from '../Redux/StoreRedux';
import { UserSelectors } from '../Redux/UserRedux';
import { firestore, rsf } from '../Services/ReduxSagaFirebase';
import { GeoLocationSelectors } from '../Redux/GeoLocationRedux';
import { GeoFirestore } from 'geofirestore'
import firebase from 'react-native-firebase'
import { FirestoreFlat } from '../Transforms';

export function watchNearby(userLocation, radius) {
  const ref = firebase.firestore().collection('userLocations')
  const geoFirestore = new GeoFirestore(ref)

  const geoQuery = geoFirestore.query({
    center: [userLocation.latitude, userLocation.longitude],
    radius
  })

  return eventChannel(emit => {
    geoQuery.on('key_entered', (key, location, distance) => {
      emit({ key, location, distance })
    })

    geoQuery.on('ready', () => {
      emit(END)
    })

    return () => geoQuery.cancel()
  })
}

export function* searchNearby() {
  const userLocation = yield select(GeoLocationSelectors.getCoords)
  const distance = yield select(SearchSelectors.getDistance)

  const channel = yield call(watchNearby, userLocation, distance)
  try {
    while (true) {
      const store = yield take(channel)

      yield put(SearchActions.nearbySuccess(store))
    }
  } finally {
    console.log('selesai')
    yield put(SearchActions.doneFetchingStoreInfo())
  }
}

export function* searchNearbyComplete() {
  yield call(delay, 500)
  yield put(SearchActions.success())
}


export function* fetchStoreInfo({ store }) {
  const specialist = yield select(SearchSelectors.getSpecialist)
  const category = yield select(SearchSelectors.getCategory)

  // Check if nearby stores have a service available
  let services = null
  if (specialist == 'all') {
    services = yield call(
      rsf.firestore.getCollection,
      firestore.collection('services')
        .where('user', '==', store.key)
        .where('category', '==', category)
    )
  } else {
  services = yield call(
      rsf.firestore.getCollection,
      firestore.collection('services')
        .where('user', '==', store.key)
        .where('specialist', '==', specialist)
    )
  }

  if (services.empty == false) {
    yield put(SearchActions.addToResult(store))
    yield put(StoreActions.fetchStoreData(store.key))
  }

  yield put(SearchActions.doneFetchingStoreInfo())
}
