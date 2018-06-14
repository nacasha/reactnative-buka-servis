import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,

  submit: ['rating', 'serviceId'],
  submitSuccess: ['data'],
  submitFailure: ['error'],

  syncRating: ['serviceId'],
  syncSuccess: ['serviceRating', 'serviceId'],
  syncFailure: ['error'],
}, { prefix: 'Rating/' })

export const RatingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // persist
  ratings: [],

  // temporarily
  modalVisible: false,
  fetching: null,
  error: null,
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
export const request = (state) =>
  state.merge({ ...state, fetching: true, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

export const syncSuccess = (state, { serviceRating, serviceId }) => {
  const ratings = { ...state.ratings }
  let ratingAverage = 0

  Object.keys(serviceRating).map(id => ratingAverage += serviceRating[id])
  ratingAverage /= Object.keys(serviceRating).length

  ratings[serviceId] = {
    ratingAverage,
    ...serviceRating
  }

  return state.merge({ ratings })
}

export const successFetch = (state, { ratings }) =>
  state.merge({ fetching: false, error: null, ratings })

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.SYNC_SUCCESS]: syncSuccess,
  [Types.SUBMIT]: request,
  [Types.SUBMIT_SUCCESS]: success,
  [Types.SUBMIT_FAILURE]: failure,
})
