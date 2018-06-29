import _ from 'lodash';
import { Content } from 'native-base';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RoundedButton from '../RoundedButton';
import { renderCategoryPicker, renderInput, renderTextarea } from './_render';

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

class ServiceForm extends React.Component {
  componentWillMount() {
    const { data } = this.props

    if (Object.keys(data).length > 0) {
      this.props.initialize({ ...data, category: { category: data.category }})
    }
  }

  render() {
    const { handleSubmit, submitting, pristine, onSubmit, fetching } = this.props

    return (
      <Content>
        <Field
          label="Titles"
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
}

export default reduxForm({
  form: 'service',
  validate
})(ServiceForm)
