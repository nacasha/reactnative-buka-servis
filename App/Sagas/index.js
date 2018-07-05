import { takeEvery,  takeLatest, all, fork } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ServiceTypes } from '../Redux/ServiceRedux'
import { ContactTypes } from '../Redux/ContactRedux';
import { AuthTypes } from '../Redux/AuthRedux';
import { FeedTypes } from '../Redux/FeedRedux';
import { GeoLocationTypes } from '../Redux/GeoLocationRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signIn, signOut, register, resetPassword } from './AuthSagas'
import { addService, deleteService, fetchService, updateService } from './ServiceSagas'
import favoriteSagas from './FavoriteSagas'
import feedSagas, { feedsRequest } from './FeedSagas'
import ratingSagas from './RatingSagas'
import storeSagas from './StoreSagas'
import reportSagas from './ReportSagas';
import { syncGeolocation, getCurrentPosition, watchLocationChannel } from './GeoLocationSagas';
import directionSagas from './DirectionSagas';
import messageSagas from './MessageSagas';
import { insertContact, updateContact, deleteContact } from './ContactSagas';
import { syncUserData, fetchMessagesDetail, updateProfile, updatePassword } from './UserSagas';
import { SearchTypes } from '../Redux/SearchRedux';
import { searchNearby, fetchStoreInfo } from './SearchSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    fork(ratingSagas),
    fork(favoriteSagas),
    fork(reportSagas),
    fork(directionSagas),
    fork(messageSagas),
    fork(storeSagas),

    takeLatest(GeoLocationTypes.WATCH_CHANNEL, watchLocationChannel),
    takeLatest(GeoLocationTypes.GET_CURRENT_POSITION, getCurrentPosition),

    // Feeds
    takeLatest(FeedTypes.FEED_REQUEST, feedsRequest),

    // Search
    takeLatest(SearchTypes.NEARBY, searchNearby),
    takeEvery(SearchTypes.NEARBY_SUCCESS, fetchStoreInfo),

    // Authentication
    takeLatest(AuthTypes.SIGNIN, signIn),
    takeLatest(AuthTypes.SIGNOUT, signOut),
    takeLatest(AuthTypes.REGISTER, register),
    takeLatest(AuthTypes.RESET_PASSWORD, resetPassword),

    // User Actions
    takeLatest(UserTypes.SYNC_USER_DATA, syncUserData),
    takeLatest(UserTypes.SYNC_USER_MESSAGE_SUCCESS, fetchMessagesDetail),

    takeLatest(UserTypes.UPDATE_PROFILE, updateProfile),
    takeLatest(UserTypes.UPDATE_PASSWORD, updatePassword),

    // Services
    takeLatest(ServiceTypes.ADD, addService),
    takeLatest(ServiceTypes.UPDATE, updateService),
    takeLatest(ServiceTypes.DELETE, deleteService),

    // Contacts
    takeLatest(ContactTypes.INSERT, insertContact),
    takeLatest(ContactTypes.UPDATE, updateContact),
    takeLatest(ContactTypes.DELETE, deleteContact),

    // Application startup
    takeLatest(StartupTypes.STARTUP, startup),
  ])
}
