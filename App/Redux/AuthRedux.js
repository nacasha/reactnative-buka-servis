import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signin: ['payload'],
  signout: ['payload'],
  register: ['email', 'password', 'data'],

  successSignin: ['payload'],
  successSignout: null,
  successRegister: null,

  resetPassword: ['email'],

  authFailure: ['error'],
}, { prefix: 'Auth/' })

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {}

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({ ...state, fetching: true, error: null })

export const success_signin = (state, { payload }) =>
  state.merge({ fetching: false, error: null, data: payload })

export const success_register = state =>
  state.merge({ fetching: false, error: null, data: false })

export const success_signout = state =>
  state.merge({ fetching: false, error: null, data: false })

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error, data: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN]: request,
  [Types.SIGNOUT]: request,
  [Types.REGISTER]: request,

  [Types.SUCCESS_SIGNIN]: success_signin,
  [Types.SUCCESS_SIGNOUT]: success_signout,
  [Types.SUCCESS_REGISTER]: success_register,

  [Types.AUTH_FAILURE]: failure,
})
