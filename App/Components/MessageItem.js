import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableNativeFeedback } from 'react-native'
import styles from './Styles/MessageItemStyle'

export default class MessageItem extends Component {
  // Prop type warnings
  static propTypes = {
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }

  render () {
    const { image, username, message } = this.props

    return (
      <TouchableNativeFeedback>
        <View>
          <View style={styles.container}>
            <Image source={{ uri: 'https://api.adorable.io/avatars/50/' + image }} style={styles.image} />
            <View>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>
          </View>
          <View style={styles.bottomBorder} />
        </View>
      </TouchableNativeFeedback>
    )
  }
}
