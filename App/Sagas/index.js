import { takeEvery,  takeLatest, all } from 'redux-saga/effects'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ServiceTypes } from '../Redux/ServiceRedux'
import { ContactTypes } from '../Redux/ContactRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { FeedTypes } from '../Redux/FeedRedux'
import { GeoLocationTypes } from '../Redux/GeoLocationRedux'
import { RatingTypes } from '../Redux/RatingRedux'
import { FavoriteTypes } from '../Redux/FavoriteRedux'
import { ReportTypes } from '../Redux/ReportRedux'
import { DirectionTypes } from '../Redux/DirectionRedux'
import { MessageTypes } from '../Redux/MessageRedux'
import { StoreTypes } from '../Redux/StoreRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signIn, signOut, register, resetPassword } from './AuthSagas'
import { addService, deleteService, updateService } from './ServiceSagas'
import { insertContact, updateContact, deleteContact } from './ContactSagas'
import { syncFavorite, submitFavorite } from './FavoriteSagas'
import { feedsRequest } from './FeedSagas'
import { syncRating, submitRating } from './RatingSagas'
import { fetchStoreData } from './StoreSagas'
import { submitReport } from './ReportSagas'
import { getCurrentPosition, watchLocationChannel } from './GeoLocationSagas'
import { fetchDirection } from './DirectionSagas'
import { sendMessage } from './MessageSagas'
import { syncUserData, fetchMessagesDetail, updateProfile } from './UserSagas'
import { SearchTypes } from '../Redux/SearchRedux'
import { searchNearby, fetchStoreInfo, searchNearbyComplete } from './SearchSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // Ratings
    takeLatest(RatingTypes.SYNC_RATING, syncRating),
    takeLatest(RatingTypes.SUBMIT, submitRating),

    // Favorites
    takeLatest(FavoriteTypes.SYNC, syncFavorite),
    takeLatest(FavoriteTypes.SUBMIT, submitFavorite),

    // Reports
    takeLatest(ReportTypes.SUBMIT, submitReport),

    // Direction
    takeLatest(DirectionTypes.FETCH, fetchDirection),

    // Messages
    takeLatest(MessageTypes.SEND_MESSAGE, sendMessage),

    // Store Data
    takeEvery(StoreTypes.FETCH_STORE_DATA, fetchStoreData),

    takeLatest(GeoLocationTypes.WATCH_CHANNEL, watchLocationChannel),
    takeLatest(GeoLocationTypes.GET_CURRENT_POSITION, getCurrentPosition),

    // Feeds
    takeLatest(FeedTypes.FEED_REQUEST, feedsRequest),

    // Search
    takeLatest(SearchTypes.NEARBY, searchNearby),
    takeLatest(SearchTypes.DONE_FETCHING_STORE_INFO, searchNearbyComplete),
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
