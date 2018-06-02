import { put, select } from 'redux-saga/effects'
import { is } from 'ramda'
import UserActions from '../Redux/UserRedux';

// process STARTUP actions
export function * startup (action) {
  console.tron.log('abcd')

  yield put(UserActions.userReset())
}
