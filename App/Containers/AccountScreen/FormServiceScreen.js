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

class FormServiceScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.state.params ? 'Edit Service' : 'Add Service'

    return {
      header: <HeaderBar title={title} back={() => navigation.pop()} />
    }
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
          text: 'Service successfully added',
          type: 'success',
          buttonText: 'Close',
          duration: 2500
        })
        this.props.navigation.pop()
      }
    }
  }

  onSubmit = (values, dispatch) => {
    values.priceRange = values.priceRange || ''
    const { title, description, price, priceRange, category } = values

    if (R.equals(values, { title, description, price, priceRange, category })) {
      this.props.add({ ...values, category: category.category })
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
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <ServiceForm onSubmit={this.onSubmit} fetching={this.props.fetching} />
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
