import React from 'react';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import RoundedButton from '../RoundedButton';
import { TextInput } from './Components';


/**
 * Form Validation
 */
const validate = values => {
  const error = {}
  error.email = ''
  error.password = ''

  var ema = values.email
  var nm = values.password
  if (values.email === undefined) {
    ema = ''
  }
  if (values.password === undefined) {
    nm = ''
  }
  if (ema.length < 8 && ema !== '') {
    error.email = 'terlalu pendek'
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = 'email tidak valid'
  }
  return error
}

/**
 * Form Render
 */
class LoginForm extends React.Component {
  render() {
    const { handleSubmit, submitting, pristine, onSubmit, fetching } = this.props

    return (
      <View>
        <Field
          label="Email"
          name="email"
          options={{
            ref: ref => this.emailInput = ref,
            autoCorrect: false,
            autoCapitalize: 'none',
            returnKeyType: 'next',
            onSubmitEditing: () => {
              this.passwordInput._root.focus()
            }
          }}
          component={TextInput}
        />
        <Field
          label="Password"
          name="password"
          options={{
            ref: ref => this.passwordInput = ref,
            autoCorrect: false,
            autoCapitalize: 'none',
            secureTextEntry: true,
            onSubmitEditing: handleSubmit(onSubmit)
          }}
          component={TextInput}
        />

        <RoundedButton
          text="Login"
          disabled={fetching}
          busy={fetching}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    )
  }
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
