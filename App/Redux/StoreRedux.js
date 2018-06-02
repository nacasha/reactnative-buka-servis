import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeRequest: ['data'],
  storeSuccess: ['payload'],
  storeFailure: null
})

export const StoreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  feeds: null,
  messages: null,
  services: null,
  favorites: null,
})

/* ------------- Selectors ------------- */

export const StoreSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const successMessages = (state, { feeds }) =>
  state.merge({ ...state, feeds })

export const successMessages = (state, { messages }) =>
  state.merge({ ...state, messages })

export const successMessages = (state, { services }) =>
  state.merge({ ...state, services })

export const successMessages = (state, { messages }) =>
  state.merge({ ...state, messages })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_REQUEST]: request,
  [Types.STORE_SUCCESS]: success,
  [Types.STORE_FAILURE]: failure
})
