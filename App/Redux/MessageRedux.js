import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Firestore from '../Services/Firestore';

const MESSAGES_DATA = [
  {
    image: 'izal',
    username: 'Izal',
    message: 'First Description',
  },
  {
    image: 'karina',
    username: 'Karina',
    message: 'Tes Tes 123',
  },
  {
    image: 'nacashsa',
    username: 'Nacasha',
    message: 'Terima kasih atas pesanan anda',
  },
  {
    image: 'febri',
    username: 'Febri',
    message: 'Halo selamat siang',
  }
]

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  messageRequest: null,
  messageSuccess: null,
  messageAll: ['userId'],
  messageDetail: ['userMessageId'],
})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userId: null,
  userMessageId: null,
  messages: [],
  messageDetail: null,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const MessageSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const request = (state, { userId }) =>
  state.merge({ fetching: true, userId })

export const success = (state) =>
  state.merge({ fetching: false, userId })

export const fetchAllMessages = (state, { userId }) => {
  return state.merge({ ...state, fetching: false, userId, messages })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MESSAGE_ALL]: fetchAllMessages,
  [Types.MESSAGE_REQUEST]: request,
  [Types.MESSAGE_SUCCESS]: success,
})
