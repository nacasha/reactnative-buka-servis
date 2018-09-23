import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedRequest: null,
  feedSuccess: ['feeds'],
  feedFailure: ['error']
}, { prefix: 'Feed/' })

export const FeedTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  feeds: null,
  fetching: true,
  error: null
})

/* ------------- Selectors ------------- */

export const FeedSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ ...state, fetching: true, error: null })

// successful api lookup
export const success = (state, { feeds }) =>
  state.merge({ feeds, fetching: false, error: null })

// Something went wrong somewhere.
export const failure = (state, { error }) =>
  state.merge({ ...state, fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEED_REQUEST]: request,
  [Types.FEED_SUCCESS]: success,
  [Types.FEED_FAILURE]: failure
})
