import R from 'ramda'
import Immutable from 'seamless-immutable'

// is this object already Immutable?
const isImmutable = R.has('asMutable')

// change this Immutable object into a JS object
const convertToJs = (state) => state.asMutable({deep: true})

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = R.when(isImmutable, convertToJs)

// convert this JS object into an Immutable object
const toImmutable = (raw) => Immutable(raw)

const selectedPersist = [
  'loggedIn',
  'data',
  'services',
  'favorites',
  'stores',
  'feeds',
  'ratings',
  'directions'
]

// the transform interface that redux-persist is expecting
export default {
  out: (state) => {
    const persistState = R.pick(selectedPersist, state)
    return toImmutable(persistState)
  },
  in: (raw) => {
    const persistRaw = R.pick(selectedPersist, raw)
    return fromImmutable(persistRaw)
  }
}
