import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { View } from 'react-native'
import styles from './FormStyles'
import RoundedButton from '../RoundedButton'
import { renderInput } from './_render';


/**
 * Form Valifation
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
const LoginForm = props => {
  const { handleSubmit, submitting, pristine, onSubmit, fetching } = props

  return (
    <View>
      <Field
        label="Email"
        name="email"
        options={{
          autoCorrect: false,
          autoCapitalize: 'none',
        }}
        component={renderInput}
      />
      <Field
        label="Password"
        name="password"
        options={{
          autoCorrect: false,
          autoCapitalize: 'none',
          secureTextEntry: true
        }}
        component={renderInput}
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

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
