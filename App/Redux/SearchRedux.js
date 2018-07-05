import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import R from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeRadius: ['radius'],

  nearby: null,
  nearbySuccess: ['store'],
  nearbyFilter: ['store'],

  fullText: null,
  fullTextSuccess: ['store'],

  reset: null
}, { prefix: 'Search/' })

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  radius: 1,
  nearby: [],
  filteredNearby: [],
  result: []
})

/* ------------- Selectors ------------- */

export const SearchSelectors = {
  getData: state => state.data,
  getRadius: state => state.search.radius
}

/* ------------- Reducers ------------- */

export const changeRadius = (state, { radius }) => (
  state.merge({ radius })
)

export const nearbySuccess = (state, { store }) => {
  const oldNearby = R.find(R.propEq('key', store.key))(state.nearby)

  if (oldNearby == undefined) {
    return state.merge({ nearby: [...state.nearby, store] })
  }
  return state
}

export const nearbyFilter = (state, { store }) => {
  return state.merge({ filteredNearby: [...state.filteredNearby, store] })
}

export const reset = state => (
  state.merge({ nearby: [], filteredNearby: [] })
)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_RADIUS]: changeRadius,
  [Types.NEARBY_SUCCESS]: nearbySuccess,
  [Types.NEARBY_FILTER]: nearbyFilter,
  [Types.RESET]: reset,
})
