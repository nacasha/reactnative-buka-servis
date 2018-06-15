import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetch: ['storeLocation', 'storeId'],
  fetchSuccess: ['direction', 'storeId'],
  fetchFailure: ['error'],
}, { prefix: 'Direction/' })

export const DirectionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  directions: {},

  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const DirectionSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({ fetching: true, error: null })

// successful api lookup
export const success = (state, { direction, storeId }) => {
  const directions = { ...state.directions }
  directions[storeId] = direction

  return state.merge({ fetching: false, error: null, directions })
}

// Something went wrong somewhere.
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH]: request,
  [Types.FETCH_SUCCESS]: success,
  [Types.FETCH_FAILURE]: failure
})
