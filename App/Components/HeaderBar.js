import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderBarStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class HeaderBar extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string.isRequired,
    back: PropTypes.func,
  }

  // Defaults for props
  static defaultProps = {
    title: 'Buka Servis'
  }

  backButtonHandler = () => {
    this.props.dispatch({ type: 'Navigation/BACK' })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.back
          ?
          <View style={styles.backButton}>
            <TouchableOpacity onPress={this.props.back}>
              <Icon name="arrow-left" size={27} color="#FFF" />
            </TouchableOpacity>
          </View>
          : <View />
        }

        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }
}
