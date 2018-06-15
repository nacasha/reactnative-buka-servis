import { select, put, call, all, takeLatest } from 'redux-saga/effects'
import ReportActions, { ReportTypes } from '../Redux/ReportRedux'
import { UserSelectors } from '../Redux/UserRedux'
import { rsf  } from '../Services/ReduxSagaFirebase';

export function* submitRating({ report, serviceId }) {
  const userId = yield select(UserSelectors.getUserId)

  try {
    const data = yield call(
      rsf.firestore.setDocument,
      `services/${serviceId}/reports/${userId}`,
      report
    )

    yield put(ReportActions.submitSuccess(data))
  }
  catch (error) {
    yield put(ReportActions.submitFailure(error))
  }
}

export default function* reportSagas() {
  yield all([
    takeLatest(ReportTypes.SUBMIT, submitRating),
  ])
}
