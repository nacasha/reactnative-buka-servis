import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import R from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setSpecialist: ['specialist'],
  setCategory: ['category'],
  setDistance: ['distance'],

  nearby: null,
  nearbySuccess: ['store'],

  addToResult: ['store'],
  doneFetchingStoreInfo: null,

  request: null,
  success: null,
  reset: null
}, { prefix: 'Search/' })

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // status
  fetching: false,

  // metadata search
  category: 'home',
  specialist: 'all',
  distance: 3,

  // results
  nearby: [],
  results: []
})

/* ------------- Selectors ------------- */

export const SearchSelectors = {
  getData: state => state.data,
  getDistance: state => state.search.distance,
  getCategory: state => state.search.category,
  getSpecialist: state => state.search.specialist
}

/* ------------- Reducers ------------- */

export const setCategory = (state, { category }) =>
  state.merge({ category })

export const setSpecialist = (state, { specialist }) =>
  state.merge({ specialist })

export const setDistance = (state, { distance }) =>
  state.merge({ distance })

export const request = state =>
  state.merge({ fetching: true })

export const success = state =>
  state.merge({ fetching: false })

export const nearbySuccess = (state, { store }) => {
  const oldNearby = R.find(R.propEq('key', store.key))(state.nearby)

  if (oldNearby == undefined) {
    return state.merge({ nearby: [...state.nearby, store] })
  }
  return state
}

export const addToResult = (state, { store }) => {
  return state.merge({ results: [...state.results, store] })
}

export const reset = state => (
  state.merge({ nearby: [], results: [] })
)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SPECIALIST]: setSpecialist,
  [Types.SET_CATEGORY]: setCategory,
  [Types.SET_DISTANCE]: setDistance,
  [Types.NEARBY_SUCCESS]: nearbySuccess,
  [Types.ADD_TO_RESULT]: addToResult,
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.RESET]: reset,
})
