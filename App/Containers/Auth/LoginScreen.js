import { Toast } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import LoginForm from '../../Components/Forms/LoginForm';
import AuthActions from '../../Redux/AuthRedux';
import styles from './Styles/LoginScreenStyle';
import R from 'ramda'
import ShowToast from '../../Services/ShowToast';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onFailure = this.onFailure.bind(this)
  }

  onSubmit(data) {
    const { onSuccess, onFailure } = this
    const { email, password } = data

    if (R.equals(data, { email, password })) {
      this.props.signin({ email, password, onSuccess, onFailure })
    } else {
      ShowToast('warning', 'Fill the form')
    }
  }

  onSuccess() {
    ShowToast('success', 'Welcome')
    this.props.navigation.pop()
  }

  onFailure(error) {
    if (error == "Email not verified") {
        text = 'Check your email to verify your account'
        type = 'warning'
      } else {
        text = 'Email or Password incorrect'
        type = 'danger'
      }

    ShowToast(type, text)
  }

  forgotPassword = () => {
    this.props.navigation.navigate({
      key: "ForgotPasswordScreen",
      routeName: "ForgotPasswordScreen"
    })
  }

  createAnAccount = () => {
    this.props.navigation.navigate({
      key: "RegisterScreen",
      routeName: "RegisterScreen"
    })
  }

  render () {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <LoginForm onSubmit={this.onSubmit} fetching={this.props.fetching} />
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => this.forgotPassword()}>
              <Text style={styles.footerText}>Forgot password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.createAnAccount()}>
              <Text style={styles.footerText}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.user.data,
    fetching: state.auth.fetching,
    error: state.auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (payload) => dispatch(AuthActions.signin(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
