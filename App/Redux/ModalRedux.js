import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openModal: ['modal'],
  closeModal: ['modal'],
}, { prefix: 'Modal/' })

export const ModalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
})

/* ------------- Selectors ------------- */

export const ModalSelectors = {
}

/* ------------- Reducers ------------- */

export const openModal = (state, { modal }) => state.set(modal, true)
export const closeModal = (state, { modal }) => state.set(modal, false)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal
})
