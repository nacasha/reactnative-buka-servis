import React from 'react';
import { Content } from 'native-base';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Dropdown, TextArea } from './Components'
import { Colors, Metrics } from '../../Themes';

const styles = StyleSheet.create({
  textButton: {
    color: Colors.facebook,
    fontWeight: 'bold',
    padding: Metrics.smallMargin,
    alignSelf: 'flex-end'
  }
})

/**
 * Form Valifation
 */
const validate = values => {
  const error = {}
  error.type = ''
  error.description = ''

  if (values.type === undefined) {
    ema = ''
  }
  if (values.description === undefined) {
    nm = ''
  }
  return error
}

/**
 * Form Render
 */
const ReportForm = props => {
  const { handleSubmit, submitting, pristine, onSubmit, fetching } = props

  return (
    <Content>
      <Field
        label="Type"
        name="type"
        items={[
          { label: 'Fake Information', value: 'Fake Information' },
          { label: 'Fraud', value: 'Fraud' },
          { label: 'No Response', value: 'No Response' }
        ]}
        component={Dropdown}
      />
      <Field
        label="Description"
        name="description"
        options={{
          autoCorrect: false,
          multiline: true,
          autoGrow: true
        }}
        component={TextArea}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={styles.textButton}>REPORT</Text>
      </TouchableOpacity>
    </Content>
  )
}

export default reduxForm({
  form: 'report',
  validate
})(ReportForm)
