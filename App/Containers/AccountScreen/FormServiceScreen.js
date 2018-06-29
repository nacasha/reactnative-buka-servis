import React, { Component } from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView } from 'react-native'
import { Toast } from 'native-base'
import { connect } from 'react-redux'
import HeaderBar from '../../Components/HeaderBar'
import ServiceForm from '../../Components/Forms/ServiceForm'
import R from 'ramda'
import ServiceActions from '../../Redux/ServiceRedux'
import ShowToast from '../../Services/ShowToast'

// Styles
import styles from './Styles/FormServiceScreenStyle'

class FormServiceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title="Add Service" back={() => navigation.pop()} />
  })

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetching === false && this.props.navigation.isFocused()) {
      if (nextProps.error != null) {
        ShowToast('danger', 'Something went wrong')
      } else {
        ShowToast('success', ' Service successfully added')
        this.props.navigation.pop()
      }
    }
  }

  onSubmit = (values, dispatch) => {
    if (values.category.category == undefined) {
      values = R.dissoc('category', values)
    }

    // Required form input
    const formInput = ['title', 'description', 'price', 'category']

    // Get keys from submitted form (redux-form)
    values.priceRange = values.priceRange || ''
    const formKeys = R.keys(values)

    // Check whether form is valid or not
    const isFormValid = R.equals(R.intersection(formInput, formKeys), formInput)

    if (isFormValid) {
      this.props.add({ ...values, category: values.category.category })
    } else {
      ShowToast('warning', 'Fill the form')
    }
  }

  render () {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <ServiceForm onSubmit={this.onSubmit} data={{}} fetching={this.props.fetching} />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.service.fetching,
    error: state.service.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (data) => dispatch(ServiceActions.add(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormServiceScreen)
