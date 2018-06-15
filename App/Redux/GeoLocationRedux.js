import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sync: null,
  syncSuccess: ['coords'],
  syncFailure: ['error'],
}, { prefix: 'GeoLocation/' })

export const GeoLocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  latitude: 0,
  longitude: 0,
  error: null
})

/* ------------- Selectors ------------- */

export const GeoLocationSelectors = {
  getCoords: state => ({
    latitude: state.geolocation.latitude,
    longitude: state.geolocation.longitude,
  })
}

/* ------------- Reducers ------------- */

export const success = (state, { coords }) => {
  return state.merge({ error: null, ...coords })
}

export const failure = (state, { error }) =>
  state.merge({ error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SYNC_SUCCESS]: success,
  [Types.SYNC_FAILURE]: failure
})
