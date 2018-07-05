import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { find, propEq, clone } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  syncUserData: null,
  syncUserDataSuccess: ['store', 'value'],
  syncUserMessageSuccess: ['store', 'value'],
  syncUserMessageDetails: ['messageId', 'messages'],

  updateProfile: ['payload'],
  updatePassword: ['payload'],
  updateSuccess: ['newValues'],
  updateFailure: ['error'],

  storeUserData: ['payload'],
  resetUserData: null,
}, { prefix: 'User/' })

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loggedIn: false,
  data: null,
  fetching: false,
  error: null,
  messageDetail: {},
  contacts: [],
  messages: [],
  favorites: {},
  ratings: {},
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getUser: state => state.user.data,
  getEmail: state => state.user.data.email,
  getUserId: state => state.user.data.uid,
  getLoginStatus: state => state.user.loggedIn,
  getMessages: state => state.user.messages,
  getMessageDetail: state => state.user.messageDetail,
}

/* ------------- Reducers ------------- */

export const syncSuccess = (state, { store, value }) =>
  state.set(store, value)

export const syncMessageDetails = (state, { messageId, messages }) => {
  return state.setIn(['messageDetail', messageId], messages)
}

export const updateSuccess = (state, { newValues }) => {
  const data = { ...state.data, ...newValues }
  return state.merge({ data })
}

export const storeUserData = (state, { payload }) =>
  state.merge({ loggedIn: true, data: payload })

export const resetUserData = () => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SYNC_USER_DATA_SUCCESS]: syncSuccess,
  [Types.SYNC_USER_MESSAGE_SUCCESS]: syncSuccess,
  [Types.SYNC_USER_MESSAGE_DETAILS]: syncMessageDetails,
  [Types.UPDATE_SUCCESS]: updateSuccess,
  [Types.STORE_USER_DATA]: storeUserData,
  [Types.RESET_USER_DATA]: resetUserData
})
