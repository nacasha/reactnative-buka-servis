import { select, put, call, take, all, takeLatest } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import ContactActions, { ContactTypes } from '../Redux/ContactRedux'
import { UserSelectors, UserTypes } from '../Redux/UserRedux'
import FirestoreFlat from '../Transforms/FirestoreFlat';
import R from 'ramda'
import { rsf, firestore } from '../Services/ReduxSagaFirebase';
import { startSubmit, stopSubmit } from 'redux-form'

export function* insertContact({ payload }) {
  const { data, onSuccess } = payload
  const userId = yield select(UserSelectors.getUserId)

  try {
    yield put(startSubmit('contact'))

    yield call(
      rsf.firestore.addDocument,
      firestore.collection('users').doc(userId).collection('contacts'),
      data,
    )

    yield put(ContactActions.success())
    onSuccess()
  }
  catch (error) {
    yield put(ContactActions.failure(error))
  }
  finally {
    yield put(stopSubmit('contact'))
  }
}

export function* updateContact({ payload }) {
  const { data, contactId, onSuccess } = payload
  const userId = yield select(UserSelectors.getUserId)

  try {
    yield put(startSubmit('contact'))

    yield call(
      rsf.firestore.setDocument,
      `users/${userId}/contacts/${contactId}`,
      data,
      { merge: true }
    )

    yield put(ContactActions.success())
    onSuccess()
  }
  catch (error) {
    yield put(ContactActions.failure(error))
  }
  finally {
    yield put(stopSubmit('contact'))
  }
}

export function* deleteContact({ payload }) {
  const { contactId } = payload
  const userId = yield select(UserSelectors.getUserId)

  try {
    yield call(
      rsf.firestore.deleteDocument,
      `users/${userId}/contacts/${contactId}`,
    )

    yield put(ContactActions.success())
  }
  catch (error) {
    yield put(ContactActions.failure(error))
  }
}
