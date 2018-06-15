import { put, call } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import UserActions from '../Redux/UserRedux'
import ServiceActions from '../Redux/ServiceRedux'
import FavoriteActions from '../Redux/FavoriteRedux'
import RatingActions from '../Redux/RatingRedux'
import { rsf, firestore } from '../Services/ReduxSagaFirebase'

export function* signIn(action) {
  const { email, password } = action
  const signIn = firebase.auth().signInAndRetrieveDataWithEmailAndPassword

  try {
    const data = yield call(
      [firebase.auth(), signIn],
      email,
      password
    )

    if (data.user.emailVerified) {
      const userData = yield call(
        rsf.firestore.getCollection,
        firestore.collection('users').doc(data.user.uid)
      )

      yield put(
        UserActions.successSignin({
          ...data.user._user,
          ...userData.data()
        })
      )
    } else {
      yield put(UserActions.userFailure('Email not verified'))
    }
  }
  catch (error) {
    yield put(UserActions.userFailure(error))
  }
}

export function* signOut() {
  try {
    const data = yield call(rsf.auth.signOut);
    yield put(UserActions.successSignout(data))
    yield put(FavoriteActions.reset())
    yield put(ServiceActions.reset())
    yield put(RatingActions.reset())
  }
  catch (error) {
    yield put(UserActions.userFailure())
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
        location: new firebase.firestore.GeoPoint(data.location.latitude, data.location.longitude)
      })

    yield state.response.user.sendEmailVerification()

    yield put(UserActions.successRegister(state.response))
  } else {
    yield put(UserActions.userFailure(state.response))
  }
}

