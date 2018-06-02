import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { find, propEq, clone } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // main action
  signin: ['email', 'password'],
  signout: ['payload'],
  register: ['email', 'password', 'data'],

  // hookup
  userRequest: null,
  userFailure: ['error'],
  userReset: null,

  // success request
  successSignin: ['payload'],
  successSignout: null,
  successRegister: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loggedIn: false,
  data: null,
  fetching: false,
  error: null
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getEmail: state => state.user.data.email
}

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({ ...state, fetching: true, error: null })

export const success_signin = (state, { payload }) =>
  state.merge({ fetching: false, error: null, data: payload, loggedIn: true })

export const success_register = state =>
  state.merge({ fetching: false, error: null, data: false, loggedIn: false })

export const success_signout = state =>
  state.merge({ fetching: false, error: null, data: false, loggedIn: false })

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error, data: null, loggedIn: false })

export const reset = state =>
  state.merge({ ...state, fetching: false, error: null })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNIN]: request,
  [Types.SIGNOUT]: request,
  [Types.REGISTER]: request,
  [Types.USER_FAILURE]: failure,
  [Types.USER_RESET]: reset,
  [Types.SUCCESS_SIGNIN]: success_signin,
  [Types.SUCCESS_SIGNOUT]: success_signout,
  [Types.SUCCESS_REGISTER]: success_register
})
