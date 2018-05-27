import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { find, propEq } from 'ramda'

const CATEGORY_DATA = [
  {
    category: 'Home',
    subCategory: ['Electric', 'Water']
  },
  {
    category: 'Laptop',
    subCategory: ['Chromebook', 'Macbook', 'Microsoft', 'Laptop']
  },
  {
    category: 'Vehicle',
    subCategory: ['Bike', 'Motorbike', 'Car', 'Truck']
  },
  {
    category: 'Smartphone',
    subCategory: ['Android', 'IPhone', 'Microsoft', 'Blackberry', 'Other']
  },
  {
    category: 'Electronic',
    subCategory: ['Television', 'Radio', 'Wash Machine', 'Refrigerator', 'AC']
  }
]

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  selectCategory: ['selectedCategory'],
  cancelSelected: null,
})

export const CategoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  selectedCategory: '',
  subCategory: CATEGORY_DATA,
})

/* ------------- Selectors ------------- */

export const CategorySelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const filterCategory = (state, { selectedCategory }) => {
  const subCategory = find(propEq('key', selectedCategory))(LIST_DATA);
  return state.merge({ selectedCategory, subCategory })
}

export const filterNone = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_CATEGORY]: filterCategory,
  [Types.CANCEL_SELECTED]: filterNone,
})
