import React from 'react'
import { StackNavigator } from 'react-navigation'
import TabNavigation from './TabNavigation'

import MessageDetailScreen from '../Containers/MessageDetailScreen'
import HeaderBar from '../Components/HeaderBar'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  Tabbar: {
    screen: TabNavigation,
    navigationOptions: {
      header: <HeaderBar />
    }
  },
  MessageDetailScreen: {
    screen: MessageDetailScreen
  }
}, {
  // Default config for all screens
  initialRouteName: 'Tabbar',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
