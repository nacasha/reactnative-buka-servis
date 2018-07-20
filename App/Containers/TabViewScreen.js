import React, { Component } from 'react'
import { TouchableOpacity, View, ScrollView, Text, KeyboardAvoidingView, Dimensions } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Styles
import styles from './Styles/TabViewScreenStyle'

// Screens
import HomeScreen from './HomeScreen'
import MessageScreen from './MessageScreen'
import HelpScreen from './HelpScreen'
import AccountScreen from './AccountScreen'

// Component
import MainTabbar from '../Components/MainTabbar'

const screens = {
  home: { label: 'Home', icon: 'home' },
  message: { label: 'Message', icon: 'message-text' },
  help: { label: 'Help', icon: 'help-circle' },
  settings: { label: 'Settings', icon: 'settings' }
}

class TabViewScreen extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Buka Servis',
    // headerRight: (
    //   <TouchableOpacity onPress={() => navigate({
    //     key: 'FormContactScreen',
    //     routeName: 'FormContactScreen'
    //   })}>
    //     <Icon
    //       name='heart-box'
    //       size={27}
    //       color={'#FFF'}
    //       style={styles.headerIcon}
    //     />
    //   </TouchableOpacity>
    // )
  })

  renderTabBar = () => (
    <MainTabbar
      data={screens}
      underlineStyle={{ height: 2, backgroundColor: 'red' }}
    />
  )

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
