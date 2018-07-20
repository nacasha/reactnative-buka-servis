import { select, put, call, fork, all, takeLatest } from 'redux-saga/effects'
import RatingActions, { RatingTypes } from '../Redux/RatingRedux'
import { UserSelectors } from '../Redux/UserRedux'
import { FirestoreFlat } from '../Transforms'
import { rsf, firestore } from '../Services/ReduxSagaFirebase';

export function* syncRating({ serviceId }) {
  yield fork(
    rsf.firestore.syncCollection,
    firestore.collection('services').doc(serviceId).collection('ratings'),
    {
      successActionCreator: snapshot => {
        const serviceRating = {}
        FirestoreFlat(snapshot).map(item => serviceRating[item.key] = item.rating)

        return RatingActions.syncSuccess(serviceRating, serviceId)
      }
    }
  )
}

export function* submitRating({ rating, serviceId }) {
  const userId = yield select(UserSelectors.getUserId)

  try {
    const data = yield call(
      rsf.firestore.setDocument,
      `services/${serviceId}/ratings/${userId}`,
      { rating }
    )

    yield put(RatingActions.submitSuccess(data))
  }
  catch (error) {
    yield put(RatingActions.submitFailure(error))
  }
}
