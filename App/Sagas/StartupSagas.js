import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'
import UserActions from '../Redux/UserRedux';
import ServiceActions from '../Redux/ServiceRedux';
import FeedActions from '../Redux/FeedRedux';

// process STARTUP actions
export function * startup (action) {
  yield put(UserActions.userReset())
  yield put(ServiceActions.serviceReset())
  yield put(FeedActions.feedRequest())
}
