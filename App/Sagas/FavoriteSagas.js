import { select, put, fork, call, takeLatest, all } from 'redux-saga/effects'
import FavoriteActions, { FavoriteTypes } from '../Redux/FavoriteRedux'
import { UserSelectors } from '../Redux/UserRedux'
import { rsf, firestore } from '../Services/ReduxSagaFirebase';
import { Toast } from 'native-base';

export function* syncFavorite() {
  const user = yield select(UserSelectors.getUser)

  if (user) {
    yield fork(
      rsf.firestore.syncDocument,
      firestore.collection('favorites').doc(user.uid),
      {
        successActionCreator: snapshot => {
          if (snapshot.exists) {
            return FavoriteActions.syncSuccess(snapshot.data())
          } else {
            return FavoriteActions.syncSuccess({})
          }
        }
      }
    )
  }
}

export function* submitFavorite({ favoriteState, storeId }) {
  const userId = yield select(UserSelectors.getUserId)

  const update = {}
  update[storeId] = favoriteState

  try {
    const data = yield call(
      rsf.firestore.setDocument,
      `favorites/${userId}`,
      update,
      { merge: true }
    )

    yield put(FavoriteActions.submitSuccess(data))
    Toast.show({
      text: 'Successfully ' + (favoriteState ? 'Added' : 'Removed'),
      type: 'success',
      duration: 1000
    })
  }
  catch (error) {
    yield put(FavoriteActions.submitFailure(error))
  }
}
