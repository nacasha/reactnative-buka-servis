import { startSubmit, stopSubmit } from 'redux-form';
import { call, put, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
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

    return () => geoQuery.cancel()
  })
}

export function* searchNearby() {
  const userLocation = yield select(GeoLocationSelectors.getCoords)
  const radius = yield select(SearchSelectors.getRadius)

  const channel = yield call(watchNearby, userLocation, radius)
  try {
    while (true) {
      const store = yield take(channel)

      yield put(SearchActions.nearbySuccess(store))
    }
  } finally {
    console.log('Nearby End')
  }
}

export function* fetchStoreInfo({ store }) {
  // Check if nearby stores have a service available
  const services = yield call(
    rsf.firestore.getCollection,
    firestore.collection('services').where('user', '==', store.key)
  )

  if (services.empty == false) {
    const storeInfo = yield call(
      rsf.firestore.getCollection,
      firestore.collection('users').doc(store.key)
    )
    const info = storeInfo._data

    yield put(SearchActions.nearbyFilter(store))
    yield put(StoreActions.storeSuccess({ info }, store.key))
  }
}
