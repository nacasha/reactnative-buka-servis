import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // sync any changes on firebase database
  sync: ['userId'],
  syncSuccess: ['favorites'],
  syncFailure: ['error'],

  submit: ['favoriteState', 'storeId'],
  submitSuccess: ['data'],
  submitFailure: ['error'],

  reset: null
}, { prefix: 'Favorite/' })

export const FavoriteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  favorites: {},

  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const FavoriteSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const request = state =>
  state.merge({ fetching: true, payload: null })

export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload })

export const syncSuccess = (state, { favorites }) =>
  state.merge({ favorites })

export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const reset = state =>
  state.merge({ favorites: {} })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SYNC_SUCCESS]: syncSuccess,
  [Types.SYNC_FAILURE]: failure,
  [Types.SUBMIT]: request,
  [Types.SUBMIT_SUCCESS]: success,
  [Types.SUBMIT_FAILURE]: failure,
  [Types.RESET]: reset
})
