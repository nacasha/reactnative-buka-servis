import React, { Component } from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, Dimensions } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TabViewScreenStyle'

// Screens
import HomeScreen from './HomeScreen'
import MessageScreen from './MessageScreen'
import HelpScreen from './HelpScreen'
import AccountScreen from './AccountScreen'

// Component
import HeaderBar from '../Components/HeaderBar'
import MainTabbar from '../Components/MainTabbar'

const screens = {
  home: { label: 'Home', icon: 'home' },
  message: { label: 'Message', icon: 'message-text' },
  help: { label: 'Help', icon: 'help-circle' },
  settings: { label: 'Settings', icon: 'settings' }
}

class TabViewScreen extends Component {
  static navigationOptions = {
    header: <HeaderBar />
  }

  renderTabBar = () => <MainTabbar data={screens} />

  render () {
    return (
      <ScrollableTabView
        locked={true}
        scrollWithoutAnimation={true}
        tabBarPosition="bottom"
        prerenderingSiblingsNumer={Infinity}
        renderTabBar={this.renderTabBar}>

        <HomeScreen tabLabel="home" {...this.props} />
        <MessageScreen tabLabel="message" {...this.props} />
        <HelpScreen tabLabel="help" />
        <AccountScreen tabLabel="settings" {...this.props} />
      </ScrollableTabView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabViewScreen)
