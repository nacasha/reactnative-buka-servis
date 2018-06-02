import React from 'react'
import { View, SectionList, Text, Image, TouchableNativeFeedback, Alert } from 'react-native'
import { connect } from 'react-redux'
import LoginRequired from '../Components/LoginRequired';
import firebase from 'react-native-firebase';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Styles
import styles from './Styles/AccountScreenStyle'
import { Metrics, Colors } from '../Themes'
import UserActions from '../Redux/UserRedux'
import _ from 'lodash'

class AccountScreen extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    data: [
      {
        key: 'Account',
        data: [
          { icon: 'map-marker', title: 'Change Location', action: '' },
          // { icon: 'email', title: 'Change Email', action: '' },
          { icon: 'account-edit', title: 'Edit Profile', action: '' },
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

    this.onPressList = _.debounce(this.onListService, 150)
    this.onPressAdd = _.debounce(this.onAddService, 150)
    this.onPressLogout = _.debounce(this.onLogout, 150)
    this.onPressAbout = _.debounce(this.onAbout, 150)
    this.onPressVersion = _.debounce(this.onVersion, 150)
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
      'Version 1.0',
      'Updated 29 May 2018',
      [
        { text: 'Ok', style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  /* ***********************************************************
  * STEP 3
  * `renderItem` function - How each cell should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
  *   return <MyCustomCell title={item.title} description={item.description} />
  *
  * For sections with different cells (heterogeneous lists), you can do branch
  * logic here based on section.key OR at the data level, you can provide
  * `renderItem` functions in each section.
  *
  * Note: You can remove section/separator functions and jam them in here
  *************************************************************/
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

  /* ***********************************************************
  * STEP 2
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *
  * Removing a function here will make SectionList use default
  *************************************************************/
  renderHeader = () =>
    <View style={[styles.item, { paddingHorizontal: Metrics.doubleBaseMargin }]}>
      <View style={styles.accountItemLeft}>
        <Image source={{ uri: 'https://api.adorable.io/avatars/80/izal' }} style={styles.accountImage} />
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.accountUsername}>{this.props.userData.name}</Text>
        <View style={styles.accountStatus}>
          <Icon name="library-books" size={15} />
          <Text style={styles.accountStatusText}>2</Text>
          <Icon name="heart" size={15} color={Colors.error} />
          <Text style={styles.accountStatusText}>18</Text>
          <Icon name="star" size={15} color={Colors.yellow} />
          <Text style={styles.accountStatusText}>18</Text>
        </View>
      </View>
    </View>

  renderSectionFooter = () =>
    <View style={styles.sectionFooter} />

  renderItemSeparator = () =>
    <View style={[styles.itemSeparator, { marginLeft: 50 }]} />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    return (
      <View style={styles.container}>
        {this.props.loggedIn
          ?
          <SectionList
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(UserActions.signout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
