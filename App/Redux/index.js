import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import { reducer as formReducer } from 'redux-form'
import { resettableReducer } from 'reduxsauce';

/* ------------- Assemble The Reducers ------------- */
const resettable = resettableReducer('RESET')

export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  message: require('./MessageRedux').reducer,
  user: require('./UserRedux').reducer,
  auth: require('./AuthRedux').reducer,
  service: require('./ServiceRedux').reducer,
  rating: resettable(require('./RatingRedux').reducer),
  feed: require('./FeedRedux').reducer,
  store: require('./StoreRedux').reducer,
  favorite: require('./FavoriteRedux').reducer,
  contact: require('./ContactRedux').reducer,
  report: require('./ReportRedux').reducer,
  geolocation: require('./GeoLocationRedux').reducer,
  direction: require('./DirectionRedux').reducer,
  modal: require('./ModalRedux').reducer,
  form: formReducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
