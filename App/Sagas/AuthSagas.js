import firebase from 'react-native-firebase'
import { call, put } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
import { firestore, rsf } from '../Services/ReduxSagaFirebase'

export function* signIn(action) {
  const { email, password } = action
  const signIn = firebase.auth().signInAndRetrieveDataWithEmailAndPassword

  try {
    const data = yield call([firebase.auth(), signIn], email, password)

    if (!data.user.emailVerified) {
      yield call(rsf.auth.signOut)
      yield put(AuthActions.authFailure('Email not verified'))
    }
  }
  catch (error) {
    yield put(AuthActions.authFailure(error))
  }
}

export function* signOut() {
  try {
    yield call(rsf.auth.signOut)
    yield put(AuthActions.successSignout())
  }
  catch (error) {
    yield put(AuthActions.authFailure())
  }
}

export function* register(action) {
  const { email, password, data } = action
  let state = {
    ok: false,
    response: null
  }

  yield firebase.auth()
    .createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(response => state = { ok: true, response })
    .catch(response => state = { ok: false, response })

  if (state.ok) {
    const { uid } = state.response.user

    yield firebase.firestore()
      .collection('users').doc(uid).set({
        email,
        name: data.name,
        gender: data.gender,
        address: data.address,
        location: data.location
      })

    yield state.response.user.sendEmailVerification()

    yield put(AuthActions.successRegister(state.response))
  } else {
    yield put(AuthActions.authFailure(state.response))
  }
}

export function* resetPassword(action) {
  const { email } = action

  yield firebase.auth().sendPasswordResetEmail(email)
}
