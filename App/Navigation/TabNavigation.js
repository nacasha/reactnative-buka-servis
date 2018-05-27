import React, { Component } from 'react'

import { TabNavigator } from 'react-navigation'
import AccountScreen from '../Containers/AccountScreen'
import HelpScreen from '../Containers/HelpScreen'
import MessageScreen from '../Containers/MessageScreen'
import HomeScreen from '../Containers/HomeScreen'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import I18n from '../I18n'
import styles from './Styles/TabStyles'
import { Metrics } from '../Themes';

const iconSize = 21

// Custom tabbar navigator
const TabbarNavigator = TabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('tabbarHome'),
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="home" size={iconSize} color={tintColor} />
      }
    }
  },
  MessageScreen: {
    screen: MessageScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('tabbarChat'),
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="message-text" size={iconSize} color={tintColor} />
      }
    }
  },
  HelpScreen: {
    screen: HelpScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('tabbarHelp'),
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="help" size={iconSize} color={tintColor} />
      }
    }
  },
  AccountScreen: {
    screen: AccountScreen,
    navigationOptions: {
      tabBarLabel: I18n.t('tabbarAccount'),
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="settings" size={iconSize} color={tintColor} />
      }
    }
  },
}, {
  initialRouteName: 'HomeScreen',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: false,
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
  }),
  initialLayout: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth
  },
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    upperCaseLabel: false,
    pressColor: '#C5CFD8',
    activeTintColor: '#2293F4',
    inactiveTintColor: '#888',
    style: styles.style,
    tabStyle: styles.tabStyle,
    labelStyle: styles.labelStyle,
    indicatorStyle: styles.indicatorStyle
  },
  navigationOptions: {
  },
})

export default TabbarNavigator
