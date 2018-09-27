import React from 'react'
import { View, SectionList, Text, Image, TouchableNativeFeedback, Alert } from 'react-native'
import { connect } from 'react-redux'
import LoginRequired from '../Components/LoginRequired';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './Styles/AccountScreenStyle'
import { Metrics, Colors } from '../Themes'
import AuthActions from '../Redux/AuthRedux'
import ContactActions from '../Redux/ContactRedux'
import _ from 'lodash'

class AccountScreen extends React.PureComponent {
  state = {
    data: [
      {
        key: 'Account',
        data: [
          { icon: 'account-edit', title: 'Edit Profile', action: () => this.onPressProfile() },
          { icon: 'key', title: 'Change Password', action: () => this.onPressPassword() },
          { icon: 'phone', title: 'Manage Contact', action: () => this.onPressContact() },
          { icon: 'logout', title: 'Logout', action: () => this.onPressLogout() },
        ]
      }, {
        key: 'Service',
        data: [
          { icon: 'library-books', title: 'List', action: () => this.onPressList() },
          { icon: 'library-plus', title: 'Add Service', action: () => this.onPressAdd() },
        ]
      }, {
        key: 'Application',
        data: [
          { icon: 'application', title: 'About', action: () => this.onPressAbout() },
          { icon: 'history', title: 'Version', action: () => this.onPressVersion() },
        ]
      },
    ]
  }

  constructor(props) {
    super(props)

    this.onPressContact = _.debounce(this.onContact, 150)
    this.onPressProfile = _.debounce(this.onProfile, 150)
    this.onPressPassword = _.debounce(this.onPassword, 150)
    this.onPressList = _.debounce(this.onListService, 150)
    this.onPressAdd = _.debounce(this.onAddService, 150)
    this.onPressLogout = _.debounce(this.onLogout, 150)
    this.onPressAbout = _.debounce(this.onAbout, 150)
    this.onPressVersion = _.debounce(this.onVersion, 150)
  }

  onContact() {
    this.props.navigation.navigate({
      key: 'ListContactScreen',
      routeName: 'ListContactScreen'
    })
  }

  onProfile() {
    const { name, gender, address, location } = this.props.userData

    this.props.navigation.navigate({
      key: 'EditProfileScreen',
      routeName: 'EditProfileScreen',
      params: { userData: { name, gender, address, location } }
    })
  }

  onPassword() {
    const { email: userEmail } = this.props.userData

    this.props.navigation.navigate({
      key: 'ChangePasswordScreen',
      routeName: 'ChangePasswordScreen',
      params: { userEmail }
    })
  }

  onListService() {
    this.props.navigation.navigate({
      key: 'ListServiceScreen',
      routeName: 'ListServiceScreen'
    })
  }

  onAddService() {
    this.props.navigation.navigate({
      key: 'FormServiceScreen',
      routeName: 'FormServiceScreen'
    })
  }

  onAbout() {
    this.props.navigation.navigate({
      key: 'AboutScreen',
      routeName: 'AboutScreen'
    })
  }

  onLogout() {
    Alert.alert(
      'Signout',
      'You will signout this account',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.props.signout() },
      ],
      { cancelable: false }
    )
  }

  onVersion() {
    Alert.alert(
      'Version 0.9',
      'Updated 25 September 2018',
      [
        { text: 'Ok', style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  renderItem ({section, item}) {
    return (
      <TouchableNativeFeedback onPress={() => item.action()}>
        <View style={styles.item}>
          <View style={styles.itemLeft} pointerEvents="none">
            <Icon name={item.icon} size={22} />
          </View>
          <View style={styles.itemRight} pointerEvents="none">
            <Text style={styles.username}>{item.title}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderSectionHeader ({section}) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{section.key}</Text>
      </View>
    )
  }

  renderHeader = () =>
    <View style={[styles.item, { paddingHorizontal: Metrics.doubleBaseMargin }]}>
      <View style={styles.accountItemLeft}>
        <Image source={{ uri: 'https://api.adorable.io/avatars/80/' + this.props.userData.uid }} style={styles.accountImage} />
      </View>
      <View style={styles.itemRightAccount}>
        <Text style={styles.accountUsername}>{this.props.userData.name}</Text>
      </View>
    </View>

  renderSectionFooter = () =>
    <View style={styles.sectionFooter} />

  renderItemSeparator = () =>
    <View style={[styles.itemSeparator, { marginLeft: 50 }]} />

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        {this.props.loggedIn
          ?
          <SectionList
            extraData={this.props}
            renderSectionHeader={this.renderSectionHeader}
            sections={this.state.data}
            contentContainerStyle={styles.listContent}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
            ListHeaderComponent={this.renderHeader}
            renderSectionFooter={this.renderSectionFooter}
            ItemSeparatorComponent={this.renderItemSeparator}
          />
          : <LoginRequired navigation={this.props.navigation} />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    userData: state.user.data,
    services: state.service.services
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(AuthActions.signout()),
    stopSync: () => dispatch(ContactActions.stopSync())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
