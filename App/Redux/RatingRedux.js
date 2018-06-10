import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,

  fetch: null,
  add: ['data', 'storeId'],
  update: ['data', 'storeId'],
  delete: ['storeId'],

  ratingSuccess: ['payload'],
  ratingFailure: ['error']
})

export const RatingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalVisible: false,
  rating: [],

  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const RatingSelectors = {
}

/* ------------- Reducers ------------- */

export const openModal = state =>
  state.merge({ ...state, modalVisible: true })

export const closeModal = state =>
  state.merge({ ...state, modalVisible: false })

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.RATING_SUCCESS]: success,
  [Types.RATING_FAILURE]: failure
})
