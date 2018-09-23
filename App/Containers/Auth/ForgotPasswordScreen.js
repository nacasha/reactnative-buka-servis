import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../Components/RoundedButton'
import AuthActions from '../../Redux/AuthRedux'
import ShowToast from '../../Services/ShowToast'
import R from 'ramda'

import styles from './Styles/ForgotPasswordScreenStyle'
import ResetPasswordForm from '../../Components/Forms/ResetPasswordForm';

class ForgotPasswordScreen extends Component {
  static navigationOptions = {
    title: 'Forgot Password'
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data) {
    if (R.has('email', data)) {
      this.props.reset(data.email)

      ShowToast('success', 'Success, Check your email')
      this.props.navigation.pop()
    } else {
      ShowToast('warning', 'Fill the form')
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ marginBottom: 10 }}>
          To reset your password, fill the form with your email and we will
          send you confirmation link to reset your password
        </Text>

        <ResetPasswordForm onSubmit={this.onSubmit} />
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
    reset: (email) => dispatch(AuthActions.resetPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
