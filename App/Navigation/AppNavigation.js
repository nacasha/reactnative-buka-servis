import React from 'react'
import { StackNavigator } from 'react-navigation'

// Home Screen
import StoreDetailScreen from '../Containers/StoreDetailScreen'
import ServiceDetailScreen from '../Containers/ServiceDetailScreen'

// Auth
import LoginScreen from '../Containers/Auth/LoginScreen'
import RegisterScreen from '../Containers/Auth/RegisterScreen'
import ForgotPasswordScreen from '../Containers/Auth/ForgotPasswordScreen'

// Account Screen
import AboutScreen from '../Containers/AccountScreen/AboutScreen'
import ListServiceScreen from '../Containers/AccountScreen/ListServiceScreen'
import FormServiceScreen from '../Containers/AccountScreen/FormServiceScreen'
import EditServiceScreen from '../Containers/AccountScreen/EditServiceScreen'

// Components
import HeaderBar from '../Components/HeaderBar'

// Screens
import TabViewScreen from '../Containers/TabViewScreen'
import MessageDetailScreen from '../Containers/MessageDetailScreen'

// Styles
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  // Main Screen
  TabViewScreen: { screen: TabViewScreen },
  StoreDetailScreen: { screen: StoreDetailScreen },
  ServiceDetailScreen: { screen: ServiceDetailScreen },
  MessageDetailScreen: { screen: MessageDetailScreen },

  // Auth
  LoginScreen: { screen: LoginScreen },
  RegisterScreen: { screen: RegisterScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },

  // Setting / Account Screen
  AboutScreen: { screen: AboutScreen },
  ListServiceScreen: { screen: ListServiceScreen },
  FormServiceScreen: { screen: FormServiceScreen },
  EditServiceScreen: { screen: EditServiceScreen },
}, {
  // Default config for all screens
  initialRouteName: 'TabViewScreen',
  navigationOptions: (nav) => ({
    header: () => <HeaderBar nav={nav} />,
    headerStyle: styles.header
  })
})

export default PrimaryNav
