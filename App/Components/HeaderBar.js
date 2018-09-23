import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/HeaderBarStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class HeaderBar extends PureComponent {
  backButtonHandler = () => {
    this.props.dispatch({ type: 'Navigation/BACK' })
  }

  renderRight() {
    return this.props.right.map(item => (
      <TouchableOpacity key={item.icon} onPress={item.action}>
        <Icon name={item.icon} size={27} color={item.color || '#FFF'} style={styles.rightIcon} />
      </TouchableOpacity>
    ))
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

        <Text style={styles.title}>Buka</Text>

        {this.props.right
          ?
            <View style={styles.rightButton}>
              {this.renderRight()}
            </View>
          : <View />
        }
      </View>
    )
  }
}
