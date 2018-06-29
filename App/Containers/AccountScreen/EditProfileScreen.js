import React, { Component } from 'react'
import { ScrollView, Text, View, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../Components/HeaderBar'
import UserActions from '../../Redux/UserRedux'
import R from 'ramda'
import ShowToast from '../../Services/ShowToast';

// Styles
import styles from './Styles/EditProfileScreenStyle'
import ProfileForm from '../../Components/Forms/ProfileForm';

class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title="Edit Profile" back={() => navigation.pop()} />
  })

  constructor(props) {
    super(props)

    const { userData } = props.navigation.state.params || {}
    this.userData = userData

    this.onSubmit = this.onSubmit.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onFailure = this.onFailure.bind(this)
  }

  onSubmit(data) {
    const { onSuccess, onFailure } = this

    // Check if the form contains this fields
    const valid = R.equals(
      R.keys(data),
      ['name', 'gender', 'address', 'location']
    )

    if (valid) {
      this.props.update({ data, onSuccess, onFailure })
    } else {
      ShowToast('warning', 'Fill the form')
    }
  }

  onSuccess() {
    ShowToast('success', 'Profile successfully updated')
    this.props.navigation.pop()
  }

  onFailure() {
    ShowToast('danger', 'Something went wrong')
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <ProfileForm onSubmit={this.onSubmit} data={this.userData} />
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
    update: (payload) => dispatch(UserActions.updateProfile(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
