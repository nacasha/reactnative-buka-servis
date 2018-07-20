import React from 'react'
import { StackNavigator } from 'react-navigation'
import FavoritesScreen from '../Containers/FavoritesScreen'

// Contact Screen
import FormContactScreen from '../Containers/ContactScreen/FormContactScreen'
import ListContactScreen from '../Containers/ContactScreen/ListContactScreen'

// Home Screen
import StoreDetailScreen from '../Containers/StoreDetailScreen'
import ServiceDetailScreen from '../Containers/ServiceDetailScreen'

// Search
import SearchFulltextScreen from '../Containers/Search/SearchFulltextScreen'
import SearchNearbyScreen from '../Containers/Search/SearchNearbyScreen'

// Auth
import LoginScreen from '../Containers/Auth/LoginScreen'
import RegisterScreen from '../Containers/Auth/RegisterScreen'
import ForgotPasswordScreen from '../Containers/Auth/ForgotPasswordScreen'

// Account Screen
import AboutScreen from '../Containers/AccountScreen/AboutScreen'
import ListServiceScreen from '../Containers/AccountScreen/ListServiceScreen'
import FormServiceScreen from '../Containers/AccountScreen/FormServiceScreen'
import EditServiceScreen from '../Containers/AccountScreen/EditServiceScreen'
import EditProfileScreen from '../Containers/AccountScreen/EditProfileScreen'
import ChangePasswordScreen from '../Containers/AccountScreen/ChangePasswordScreen'

// Components
import HeaderBar from '../Components/HeaderBar'

// Screens
import TabViewScreen from '../Containers/TabViewScreen'
import MessageDetailScreen from '../Containers/MessageDetailScreen'
import StoreDirectionScreen from '../Containers/StoreDirectionScreen'

// Styles
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  FavoritesScreen: { screen: FavoritesScreen },
  SearchFulltextScreen: { screen: SearchFulltextScreen },
  SearchNearbyScreen: { screen: SearchNearbyScreen },

  StoreDirectionScreen: { screen: StoreDirectionScreen },

  FormContactScreen: { screen: FormContactScreen },
  ListContactScreen: { screen: ListContactScreen },
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
  ChangePasswordScreen: { screen: ChangePasswordScreen },
  EditProfileScreen: { screen: EditProfileScreen },
}, {
  // Default config for all screens
  initialRouteName: 'TabViewScreen',
  navigationOptions: {
    ...styles
  }
})

export default PrimaryNav
