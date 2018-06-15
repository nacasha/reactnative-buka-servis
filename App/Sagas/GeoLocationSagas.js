import { put, call, take, takeLatest, all } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import GeoLocationActions, { GeoLocationTypes } from '../Redux/GeoLocationRedux'

function watch() {
  return eventChannel(emitter => {
    navigator.geolocation.watchPosition(
      ({ coords }) => emitter(coords),
      (error) => emitter(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )

    return () => navigator.geolocation.clearWatch()
  })
}

function* syncGeolocation() {
  const data = yield call(watch)
  try {
    while (true) {
      const coords = yield take(data)

      yield put(GeoLocationActions.syncSuccess(coords))
    }
  } finally {
    console.log('sync stopped')
  }
}

export default function* geoLocationSagas() {
  yield all([
    takeLatest(GeoLocationTypes.SYNC, syncGeolocation),
  ])
}
