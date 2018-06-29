import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../Components/HeaderBar'
import RoundedButton from '../../Components/RoundedButton';
import AuthActions from '../../Redux/AuthRedux'

// Styles
import styles from './Styles/ChangePasswordScreenStyle'
import ShowToast from '../../Services/ShowToast';

class ChangePasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title="Change Password" back={() => navigation.pop()} />
  })

  constructor(props) {
    super(props)

    const { userEmail } = props.navigation.state.params || {}

    this.userEmail = userEmail

    this.sendResetPassword = this.sendResetPassword.bind(this)
  }

  sendResetPassword() {
    this.props.reset(this.userEmail)

    ShowToast('success', 'Successfully sent to your email')
    this.props.navigation.pop()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>
          To change your account's password, we will
          send you confirmation link to reset your password to
          your email. Click button below to proceed
        </Text>

        <RoundedButton
          text="Send Reset Password Link"
          onPress={this.sendResetPassword}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen)
