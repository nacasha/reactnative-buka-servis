import { put } from 'redux-saga/effects'
import firebase from 'react-native-firebase'
import UserActions from '../Redux/UserRedux'

export function* signIn(action) {
  const { email, password } = action
  let state = {
    ok: false,
    response: null
  }

  yield firebase.auth()
    .signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then(response => state = { ok: true, response })
    .catch(response => state = { ok: false, response })

  if (state.ok) {
    // check if user email is verified
    if (!state.response.user.emailVerified) {
      yield put(UserActions.userFailure('Email not verified'))
    } else {
      // get user detail in firestore
      yield firebase.firestore()
        .collection('users').doc(email).get()
        .then(doc => {
          if (doc.exists) {
            response = {
              ...state.response.user._user,
              ...doc.data()
            }

            state = { ok: true, response }
          } else {
            state = { ok: false, response: 'User not found' }
          }
        })

      yield put(UserActions.successSignin(state.response))
    }
  } else {
    yield put(UserActions.userFailure(state.response))
  }
}

export function* signOut(action) {
  let state = {
    ok: false,
    response: null
  }

  yield firebase.auth().signOut()
    .then(() => state = { ok: true, response: null })
    .catch(response => state = { ok: false, response })

  if (state.ok) {
    yield put(UserActions.successSignout(state.response))
  } else {
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
    yield firebase.firestore()
      .collection('users').doc(email).set({
        name: data.name,
        gender: data.gender,
        address: data.address,
        location: new firebase.firestore.GeoPoint(data.location.latitude, data.location.longitude)
      })

    yield put(UserActions.successRegister(state.response))
  } else {
    yield put(UserActions.userFailure(state.response))
  }
}

