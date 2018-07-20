import { Content } from 'native-base';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RoundedButton from '../RoundedButton';
import { LocationPicker, Dropdown, TextArea, TextInput } from './Components';

const validate = values => {
  // store error state
  const error = {
    email: '',
    password: '',
    name: '',
    gender: '',
    address: ''
  }

  // form value
  let email = values.email
  let password = values.password
  let name = values.name
  let gender = values.gender
  let address = values.address

  email = values.email || ''
  password = values.password || ''
  name = values.name || ''
  gender = values.gender || 'male'
  address = values.address || ''

  if (!email.includes('@') && email !== '') {
    error.email = 'email tidak valid'
  }
  if (password.length < 5 && password !== '') {
    error.password = 'minimal 5 karakter'
  }
  if (name.length < 3 && name !== '') {
    error.name = 'nama terlalu pendek'
  }
  if (address.length <= 10 && address !== '') {
    error.address = 'minimal 10 karakter'
  }

  return error
}

const RegisterForm = props => {
  const { handleSubmit, submitting, pristine, onSubmit, fetching } = props

  return (
    <Content>
      <Field
        label="Email"
        name="email"
        options={{
          autoCorrect: false,
          autoCapitalize: 'none',
        }}
        component={TextInput}
      />
      <Field
        label="Password"
        name="password"
        options={{
          autoCorrect: false,
          autoCapitalize: 'none',
          secureTextEntry: true
        }}
        component={TextInput}
      />
      <Field
        label="Full Name"
        name="name"
        options={{
          autoCorrect: false,
        }}
        component={TextInput}
      />
      <Field
        label="Gender"
        name="gender"
        items={[
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' }
        ]}
        component={Dropdown}
      />
      <Field
        label="Address"
        name="address"
        options={{
          autoCorrect: false,
          multiline: true,
          autoGrow: true
        }}
        component={TextArea}
      />
      <Field
        name="location"
        component={LocationPicker}
      />

      <RoundedButton
        text="Submit"
        disabled={fetching}
        busy={fetching}
        onPress={handleSubmit(onSubmit)}
      />
    </Content>
  )
}

export default reduxForm({
  form: 'register',
  validate
})(RegisterForm)
