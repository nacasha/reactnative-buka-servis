import { Content } from 'native-base';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RoundedButton from '../RoundedButton';
import { renderInput, renderPicker, renderTextarea, renderLocationPicker } from './_render';

class ProfileForm extends React.Component {
  componentWillMount() {
    const { data } = this.props

    this.props.initialize({ gender: 'Male' })

    if (data) {
      this.props.initialize(data)
    }
  }

  render() {
    const { handleSubmit, onSubmit, submitting } = this.props

    return (
      <Content>
        <Field
          label="Full Name"
          name="name"
          options={{
            autoCorrect: false,
          }}
          component={renderInput}
        />
        <Field
          label="Gender"
          name="gender"
          items={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
          ]}
          component={renderPicker}
        />
        <Field
          label="Address"
          name="address"
          options={{
            autoCorrect: false,
            multiline: true,
            autoGrow: true
          }}
          component={renderTextarea}
        />
        <Field
          name="location"
          component={renderLocationPicker}
        />

        <RoundedButton
          text="Submit"
          disabled={submitting}
          busy={submitting}
          onPress={handleSubmit(onSubmit)}
        />
      </Content>
    )
  }
}

export default reduxForm({
  form: 'profile',
})(ProfileForm)
