import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sync: null,
  syncSuccess: ['userList', 'keys'],
  syncFailure: ['error'],
  syncDetail: ['newMessage', 'user'],

  storeUserInfo: ['info', 'user'],

  sendMessage: ['data', 'messageId', 'storeId', 'storeName'],

  reset: null
}, { prefix: 'Message/' })

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  messages: {},
  userInfo: {},
  userList: [],

  fetching: null,
  error: null,

  reset: null
})

/* ------------- Selectors ------------- */

export const MessageSelectors = {
  getData: state => state.data,
  getUserInfo: state => state.message.userInfo
}

/* ------------- Reducers ------------- */

export const success = (state, { userList }) => {
  return state.merge({ userList })
}

export const storeUserInfo = (state, { info, user }) => {
  const userInfo = { ...state.userInfo }
  userInfo[user] = info

  return state.merge({ userInfo })
}

export const successDetail = (state, { newMessage, user }) => {
  const messages = { ...state.messages }
  messages[user] = newMessage

  return state.merge({ messages })
}

export const failure = (state, { error }) =>
  state.merge({ error })

export const reset = state =>
  state.merge({ messages: {}, userInfo: {}, userList: [] })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_USER_INFO]: storeUserInfo,
  [Types.SYNC_SUCCESS]: success,
  [Types.SYNC_DETAIL]: successDetail,
  [Types.SYNC_FAILURE]: failure,
  [Types.RESET]: reset,
})
