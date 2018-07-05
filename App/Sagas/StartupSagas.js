import { put } from 'redux-saga/effects'
import FeedActions from '../Redux/FeedRedux';
import UserActions from '../Redux/UserRedux';
import FavoriteActions from '../Redux/FavoriteRedux';
import GeoLocationActions from '../Redux/GeoLocationRedux';
import MessageActions from '../Redux/MessageRedux';

// process STARTUP actions
export function * startup (action) {
  yield put(UserActions.syncUserData())
  yield put(FeedActions.feedRequest())
  yield put(GeoLocationActions.watchChannel())
  yield put(GeoLocationActions.getCurrentPosition())
}
