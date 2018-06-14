import ReduxSagaFirebase from 'redux-saga-firebase'
import firebase from 'react-native-firebase'

const rsf = new ReduxSagaFirebase(firebase)
const firestore = firebase.firestore()

export {
  rsf,
  firestore
}
