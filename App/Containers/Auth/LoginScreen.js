import { Toast } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import LoginForm from '../../Components/Forms/LoginForm';
import HeaderBar from '../../Components/HeaderBar';
import AuthActions from '../../Redux/AuthRedux';
import styles from './Styles/LoginScreenStyle';
import R from 'ramda'

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetching === false && this.props.navigation.isFocused()) {
      if (nextProps.error != null) {
        if (nextProps.error == "Email not verified") {
          text = 'Check your email to verify your account'
          type = 'warning'
        } else {
          text = 'Email or Password incorrect'
          type = 'danger'
        }

        Toast.show({
          text: text,
          type: type,
          buttonText: 'Close',
          duration: 2500
        })
      } else {
        Toast.show({
          text: 'Welcome, ' + nextProps.data.name,
          type: 'success',
          buttonText: 'Close',
          duration: 2500
        })
        this.props.navigation.pop()
      }
    }
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

  onSubmit = (values, dispatch) => {
    const { email, password } = values

    if (R.equals(values, { email, password })) {
      this.props.signin(email, password)
    } else {
      Toast.show({
        text: 'Fill the form',
        type: 'warning',
        buttonText: 'Close',
        duration: 2500
      })
    }
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
    signin: (e, p) => dispatch(AuthActions.signin(e, p))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
