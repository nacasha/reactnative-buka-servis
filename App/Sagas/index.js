import { takeEvery,  takeLatest, all, fork } from 'redux-saga/effects'
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
import { addService, deleteService, fetchService, updateService } from './ServiceSagas'
import favoriteSagas from './FavoriteSagas'
import feedSagas from './FeedSagas'
import ratingSagas from './RatingSagas'
import storeSagas from './StoreSagas'
import reportSagas from './ReportSagas';
import geoLocationSagas from './GeoLocationSagas';
import directionSagas from './DirectionSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    fork(feedSagas),
    fork(ratingSagas),
    fork(storeSagas),
    fork(favoriteSagas),
    fork(reportSagas),
    fork(geoLocationSagas),
    fork(directionSagas),

    // Authentication
    takeLatest(UserTypes.SIGNIN, signIn),
    takeLatest(UserTypes.SIGNOUT, signOut),
    takeLatest(UserTypes.REGISTER, register),

    // Services
    takeLatest(ServiceTypes.ADD, addService),
    takeLatest(ServiceTypes.UPDATE, updateService),
    takeLatest(ServiceTypes.DELETE, deleteService),
    takeLatest(ServiceTypes.FETCH, fetchService),

    // Application startup
    takeLatest(StartupTypes.STARTUP, startup),
  ])
}
