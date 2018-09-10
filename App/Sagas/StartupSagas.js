import { DeviceEventEmitter } from 'react-native';
import { put } from 'redux-saga/effects'
import FeedActions from '../Redux/FeedRedux';
import UserActions from '../Redux/UserRedux';
import GeoLocationActions from '../Redux/GeoLocationRedux';

// process STARTUP actions
export function * startup (action) {
  yield put(UserActions.syncUserData())
  yield put(FeedActions.feedRequest())
  yield put(GeoLocationActions.watchChannel())
  yield put(GeoLocationActions.getCurrentPosition())
}
