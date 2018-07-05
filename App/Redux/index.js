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
  auth: require('./AuthRedux').reducer,
  user: require('./UserRedux').reducer,
  message: require('./MessageRedux').reducer,
  service: require('./ServiceRedux').reducer,
  rating: resettable(require('./RatingRedux').reducer),
  feed: require('./FeedRedux').reducer,
  search: require('./SearchRedux').reducer,
  store: require('./StoreRedux').reducer,
  favorite: require('./FavoriteRedux').reducer,
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
