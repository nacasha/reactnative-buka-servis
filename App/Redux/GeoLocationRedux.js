import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  watchChannel: null,

  getCurrentPosition: null,

  request: null,
  success: ['coords'],
  failure: ['error']
}, { prefix: 'GeoLocation/' })

export const GeoLocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  coords: {
    latitude: 0,
    longitude: 0
  },
  error: null,
  busy: false
})

/* ------------- Selectors ------------- */

export const GeoLocationSelectors = {
  getCoords: state => state.geolocation.coords
}

/* ------------- Reducers ------------- */

export const request = state =>
  state.merge({ busy: true, error: null })

export const success = (state, { coords }) =>
  state.merge({ busy: false, error: null, coords })

export const failure = (state, { error }) =>
  state.merge({ busy: false, error: error.message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
})
