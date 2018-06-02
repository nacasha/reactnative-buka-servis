import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import HeaderBar from '../../Components/HeaderBar'

// Styles
import styles from './Styles/ForgotPasswordScreenStyle'

class ForgotPasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title="Forgot Password" back={() => navigation.pop()} />
  })

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>ForgotPasswordScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
