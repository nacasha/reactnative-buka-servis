import { Content } from 'native-base';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RoundedButton from '../RoundedButton';
import { TextInput } from './Components'

class ResetPasswordForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit, submitting } = this.props

    return (
      <Content>
        <Field
          label="Email"
          name="email"
          options={{
            autoCorrect: false,
          }}
          component={TextInput}
        />

        <RoundedButton
          text="Send Reset Password Link"
          disabled={submitting}
          busy={submitting}
          onPress={handleSubmit(onSubmit)}
        />
      </Content>
    )
  }
}

export default reduxForm({
  form: 'resetPassword',
})(ResetPasswordForm)
