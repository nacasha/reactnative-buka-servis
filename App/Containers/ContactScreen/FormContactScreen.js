// Modules import
import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import R from 'ramda'

// Components
import ContactForm from '../../Components/Forms/ContactForm'
import ShowToast from '../../Services/ShowToast'

// Redux Actions
import ContactActions from '../../Redux/ContactRedux'

// Styles
import styles from './Styles/FormContactScreenStyle'

class FormContactScreen extends Component {
  static navigationOptions = {
    title: 'Form Contact'
  }

  constructor(props) {
    super(props)

    const { contactData } = props.navigation.state.params || {}
    this.contactData = contactData

    this.onSubmit = this.onSubmit.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onFailure = this.onFailure.bind(this)
  }

  onSubmit(data) {
    const { onSuccess, onFailure } = this

    if (R.has('value', data)) {
      if (this.contactData) {
        const contactId = this.contactData.key

        this.props.update({ data, contactId, onSuccess, onFailure })
      } else {
        this.props.insert({ data, onSuccess, onFailure })
      }
    } else {
      ShowToast('warning', 'Fill the form')
    }
  }

  onSuccess() {
    const text = this.contactData ? 'updated' : 'added'

    ShowToast('success', `Contact successfully ${text}`)
    this.props.navigation.pop()
  }

  onFailure() {
    ShowToast('danger', 'Something went wrong')
  }

  render () {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <ContactForm onSubmit={this.onSubmit} data={this.contactData}/>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    insert: (data, success, failure) => dispatch(ContactActions.insert(data, success, failure)),
    update: (data, success, failure) => dispatch(ContactActions.update(data, success, failure))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContactScreen)
