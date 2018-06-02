import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  add: ['data'],
  edit: ['data', 'serviceId'],
  delete: ['serviceId'],
  fetch: null,

  serviceSuccess: ['payload'],
  serviceFailure: ['error']
})

export const ServiceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  serviceId: null,
  services: [],
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ServiceSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const request = (state, { data }) =>
  state.merge({ fetching: true, error: null })

export const success = (state, action) =>
  state.merge({ fetching: false, error: null })

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD]: request,
  [Types.EDIT]: request,
  [Types.DELETE]: request,
  [Types.FETCH]: request,
  [Types.SERVICE_SUCCESS]: success,
  [Types.SERVICE_FAILURE]: failure
})
