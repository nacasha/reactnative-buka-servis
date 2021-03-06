import { fork, put, call, all, takeLatest } from 'redux-saga/effects'
import StoreActions, { StoreTypes } from '../Redux/StoreRedux'
import FirestoreFlat from '../Transforms/FirestoreFlat';
import { rsf, firestore } from '../Services/ReduxSagaFirebase';

// -------------------------------------------------------------
// -------------------------------------------------------------
// Global Variables

let syncChannel = {}

// -------------------------------------------------------------
// -------------------------------------------------------------

const fetchFavorites = (storeId) => fork(
  rsf.firestore.syncCollection,
  firestore.collection('favorites').where(storeId, '==', true),
  {
    transform: FirestoreFlat,
    successActionCreator: favorites => (
      StoreActions.storeSuccess({ favorites }, storeId)
    )
  }
)

const fetchServices = (storeId) => fork(
  rsf.firestore.syncCollection,
  firestore.collection('services').where('user', '==', storeId),
  {
    transform: FirestoreFlat,
    successActionCreator: services => (
      StoreActions.storeSuccess({ services }, storeId)
    )
  }
)

const fetchContacts = (storeId) => fork(
  rsf.firestore.syncCollection,
  firestore.collection('users').doc(storeId).collection('contacts'),
  {
    transform: FirestoreFlat,
    successActionCreator: contacts => (
      StoreActions.storeSuccess({ contacts }, storeId)
    )
  }
)

const fetchUserInfo = (storeId) => fork(
  rsf.firestore.syncDocument,
  `users/${storeId}`,
  {
    successActionCreator: user => {
      const info = { ...user.data(), uid: user.id }
      return StoreActions.storeSuccess({ info }, storeId)
    }
  }
)

export function* fetchStoreData({ storeId }) {
  syncChannel.userInfo = yield fetchUserInfo(storeId)
  syncChannel.favorites = yield fetchFavorites(storeId)
  syncChannel.services = yield fetchServices(storeId)
  syncChannel.contacts = yield fetchContacts(storeId)
}
