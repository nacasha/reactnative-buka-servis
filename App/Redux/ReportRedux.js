import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,

  submit: ['report', 'serviceId'],
  submitSuccess: null,
  submitFailure: ['error']
}, { prefix: 'Report/' })

export const ReportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalVisible: false,
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const ReportSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const openModal = state =>
  state.merge({ modalVisible: true })

export const closeModal = state =>
  state.merge({ modalVisible: false })

export const request = state =>
  state.merge({ fetching: true, error: null })

export const success = state =>
  state.merge({ fetching: false, error: null })

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error: error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.SUBMIT]: request,
  [Types.SUBMIT_SUCCESS]: success,
  [Types.SUBMIT_FAILURE]: failure
})
