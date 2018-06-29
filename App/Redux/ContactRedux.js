import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  insert: ['payload'],
  update: ['payload'],
  delete: ['payload'],

  success: null,
  failure: ['error']
}, { prefix: 'Contact/' })

export const ContactTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  busy: false,
  error: null
})

/* ------------- Selectors ------------- */

export const ContactSelectors = {}

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({ busy: true, error: null })

export const success = (state) =>
  state.merge({ busy: false, error: null })

export const failure = (state, { error }) =>
  state.merge({ busy: false, error: error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INSERT]: request,
  [Types.UPDATE]: request,
  [Types.DELETE]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
})
