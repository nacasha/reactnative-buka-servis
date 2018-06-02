import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Container, Header, Content, Input, Item, Text, Label, Picker } from 'native-base'
import { View } from 'react-native'
import styles from './FormStyles'
import _ from 'lodash'
import RoundedButton from '../RoundedButton'
import DropdownAlert from 'react-native-dropdownalert'
import { renderInput, renderPicker, renderLocationPicker, renderTextarea, renderCategoryPicker } from './_render';

const validate = values => {
  // store error state
  const error = {
    title: '',
    description: '',
    price: '',
    priceRange: '',
    category: ''
  }

  // form value
  let title = values.title
  let description = values.description
  let price = values.price
  let priceRange = values.priceRange
  let category = values.category

  title = values.title || ''
  description = values.description || ''
  price = values.price || ''
  priceRange = values.priceRange || ''
  category = values.category || ''

  if (!_.isFinite(Number(price)) && price !== '') {
    error.price = 'masukkan angka'
  }
  if (price < 0 && price !== '') {
    error.price = 'masukkan angka positif'
  }
  if (!_.isFinite(Number(priceRange)) && priceRange !== '') {
    error.priceRange = 'masukkan angka'
  }
  if (priceRange < 0 && priceRange !== '') {
    error.priceRange = 'masukkan angka positif'
  }

  return error
}

const ServiceForm = props => {
  const { handleSubmit, submitting, pristine, onSubmit, fetching, data } = props

  return (
    <Content>
      <Field
        label="Title"
        name="title"
        options={{
          autoCorrect: false,
          autoCapitalize: 'none',
        }}
        component={renderInput}
      />
      <Field
        label="Description"
        name="description"
        options={{
          autoCorrect: false,
          multiline: true,
          autoGrow: true
        }}
        component={renderTextarea}
      />
      <Field
        label="Price"
        name="price"
        options={{
          autoCorrect: false,
          keyboardType: 'numeric'
        }}
        component={renderInput}
      />
      <Field
        label="Price Range (Optional)"
        name="priceRange"
        options={{
          autoCorrect: false,
          keyboardType: 'numeric',
          placeholder: 'Fill this to make price range',
          placeholderTextColor: '#CCC'
        }}
        component={renderInput}
      />
      <Field
        label="Category"
        name="category"
        component={renderCategoryPicker}
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
  form: 'service',
  validate
})(ServiceForm)
