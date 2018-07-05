import { channel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import GeoLocationActions from '../Redux/GeoLocationRedux';

export const locationChannel = channel()

export function* watchLocationChannel() {
  while (true) {
    const action = yield take(locationChannel)
    yield put(action)
  }
}

export function* getCurrentPosition() {
  yield put(GeoLocationActions.request())

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => locationChannel.put(GeoLocationActions.success(coords)),
    (error) => locationChannel.put(GeoLocationActions.failure(error)),
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }
  )
}
