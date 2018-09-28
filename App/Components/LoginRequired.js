import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import styles from './Styles/LoginRequiredStyle'
import RoundedButton from './RoundedButton'
import { Images } from '../Themes'

export default class LoginRequired extends Component {
  onPress = () => {
    this.props.navigation.navigate({
      key: 'LoginScreen',
      routeName: 'LoginScreen'
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.shield} style={styles.image} />
        <Text style={styles.text}>Please Login to use this feature</Text>
        <View style={styles.buttonSection}>
          <RoundedButton text="Login" onPress={this.onPress} debounce/>
        </View>
      </View>
    )
  }
}
