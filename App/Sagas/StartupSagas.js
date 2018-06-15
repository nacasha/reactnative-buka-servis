import { put } from 'redux-saga/effects'
import FeedActions from '../Redux/FeedRedux';
import FavoriteActions from '../Redux/FavoriteRedux';
import GeoLocationActions from '../Redux/GeoLocationRedux';
import RatingActions from '../Redux/RatingRedux';

// process STARTUP actions
export function * startup (action) {
  yield put(FeedActions.feedRequest())
  yield put(FavoriteActions.sync())
  yield put(GeoLocationActions.sync())
}
