import { takeEvery,  takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ServiceTypes } from '../Redux/ServiceRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signIn, signOut, register } from './AuthSagas'
import { add, fetch } from './ServiceSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // Authentication
    takeLatest(UserTypes.SIGNIN, signIn),
    takeLatest(UserTypes.SIGNOUT, signOut),
    takeLatest(UserTypes.REGISTER, register),

    // Services
    takeLatest(ServiceTypes.ADD, add),
    takeLatest(ServiceTypes.FETCH, fetch),

    // Application startup
    takeLatest(StartupTypes.STARTUP, startup),
  ])
}
