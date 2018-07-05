import React, { Component } from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView } from 'react-native'
import { Toast } from 'native-base'
import { connect } from 'react-redux'
import HeaderBar from '../../Components/HeaderBar'
import ServiceForm from '../../Components/Forms/ServiceForm'
import R from 'ramda'
import ServiceActions from '../../Redux/ServiceRedux'

// Styles
import styles from './Styles/FormServiceScreenStyle'

class EditServiceScreen extends Component {
  static navigationOptions = {
    title: 'Edit Service'
  }

  constructor(props) {
    super(props)

    this.serviceId = props.navigation.state.params.data.key
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetching === false && this.props.navigation.isFocused()) {
      if (nextProps.error != null) {
        Toast.show({
          text: 'Something went wrong',
          type: 'danger',
          buttonText: 'Close',
          duration: 2500
        })
      } else {
        Toast.show({
          text: 'Service successfully updated',
          type: 'success',
          buttonText: 'Close',
          duration: 2500
        })
        this.props.navigation.pop()
      }
    }
  }

  onSubmit = (values, dispatch) => {
    // Required form input
    const formInput = ['title', 'description', 'price', 'category']

    // Get keys from submitted form (redux-form)
    const formKeys = R.keys(values)

    // Check whether form is valid or not
    const isFormValid = R.equals(R.intersection(formInput, formKeys), formInput)

    if (isFormValid) {
      values = R.dissoc('key', values)
      this.props.update({ ...values, category: values.category.category }, this.serviceId)
    } else {
      Toast.show({
        text: 'Fill the form',
        type: 'warning',
        buttonText: 'Close',
        duration: 2500
      })
    }
  }

  render () {
    const { data } = this.props.navigation.state.params

    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <ServiceForm onSubmit={this.onSubmit} data={data} fetching={this.props.fetching} />
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
    update: (data, serviceId) => dispatch(ServiceActions.update(data, serviceId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceScreen)
