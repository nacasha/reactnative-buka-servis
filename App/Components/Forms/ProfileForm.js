import { Content } from 'native-base';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RoundedButton from '../RoundedButton';
import { LocationPicker, Dropdown, TextArea, TextInput } from './Components';

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
