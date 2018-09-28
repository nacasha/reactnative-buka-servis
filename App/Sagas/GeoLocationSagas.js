import { Alert } from 'react-native'
import { channel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import GeoLocationActions from '../Redux/GeoLocationRedux';
import { requestLocationService } from '../Services/DeviceRequest';

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
    ({ coords }) => {
      return locationChannel.put(GeoLocationActions.success(coords))
    },
    (error) => {
      requestLocationService()

      return locationChannel.put(GeoLocationActions.failure(error))
    },
    {
      timeout: 60000,
      maximumAge: 1000
    }
  )
}
