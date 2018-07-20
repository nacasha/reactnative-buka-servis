import { Content } from 'native-base';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RoundedButton from '../RoundedButton';
import { Dropdown, TextInput } from './Components'

class ContactForm extends React.Component {
  componentWillMount() {
    const { data } = this.props

    this.props.initialize({ type: 'phone' })

    if (data) {
      this.props.initialize(data)
    }
  }

  render() {
    const { handleSubmit, onSubmit, submitting } = this.props

    return (
      <Content>
        <Field
          label="Contact Type"
          name="type"
          items={[
            { label: 'Phone', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Whatsapp', value: 'whatsapp' },
            { label: 'Website', value: 'blog' },
            { label: 'BBM', value: 'bbm' },
            { label: 'LINE', value: 'line' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'Path', value: 'path' }
          ]}
          component={Dropdown}
        />
        <Field
          label="Contact"
          name="value"
          options={{
            autoCorrect: false,
          }}
          component={TextInput}
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
  form: 'contact',
})(ContactForm)
