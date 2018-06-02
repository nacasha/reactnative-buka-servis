import firebase from 'react-native-firebase'
import UserActions from '../Redux/UserRedux'

export default {
  signIn: (email, password) => {
    let data

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => data = response)
      .catch(error => data = error)

    return { ok: true, data }
  },
  signOut: () => {
    firebase.auth().signOut()

    return { ok: true }
  },
}
