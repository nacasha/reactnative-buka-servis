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
      Alert.alert(
        'No Location Service',
        'Please enable GPS before using application',
        [
          { text: 'Enable', onPress: () => { requestLocationService() } },
          { text: 'Close', style: 'cancel' },
        ],
        { cancelable: false }
      )

      return locationChannel.put(GeoLocationActions.failure(error))
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }
  )
}
