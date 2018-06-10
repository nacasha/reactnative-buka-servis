import { takeEvery,  takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ServiceTypes } from '../Redux/ServiceRedux'
import { FeedTypes } from '../Redux/FeedRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signIn, signOut, register } from './AuthSagas'
import { addService, deleteService, fetchService, updateService } from './ServiceSagas'
import { feedsRequest } from './FeedSagas'
import { StoreTypes } from '../Redux/StoreRedux';
import { fetchStoreDetail } from './StoreSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // Feeds Services
    takeLatest(FeedTypes.FEED_REQUEST, feedsRequest),

    // Authentication
    takeLatest(UserTypes.SIGNIN, signIn),
    takeLatest(UserTypes.SIGNOUT, signOut),
    takeLatest(UserTypes.REGISTER, register),

    // Services
    takeLatest(ServiceTypes.ADD, addService),
    takeLatest(ServiceTypes.UPDATE, updateService),
    takeLatest(ServiceTypes.DELETE, deleteService),
    takeLatest(ServiceTypes.FETCH, fetchService),

    // Store Detail
    takeLatest(StoreTypes.FETCH_STORE_DETAIL, fetchStoreDetail),

    // Application startup
    takeLatest(StartupTypes.STARTUP, startup),
  ])
}
