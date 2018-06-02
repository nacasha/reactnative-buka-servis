import firebase from 'react-native-firebase'

export default {
  getMessages: (userId) => {
    const instance = firebase.firestore().collection('messages')

    instance
      .where('user.izal', '==', true)
      .get(snapshot => console.log(snapshot))
  }
}
