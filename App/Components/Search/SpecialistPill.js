import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/SpecialistCardStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class SpecialistPill extends Component {
  shouldComponentUpdate(nextProps) {
    const { data: { key }, selected } = this.props
    const { selected: nextSelected } = nextProps

    if (key == nextSelected) {
      return true
    } else if (key == selected && key != nextSelected) {
      return true
    }

    return false
  }

  render() {
    const { data: { key, title, icon }, selected } = this.props
    const isActive = key == selected ? true : false

    const activeStyle = {
      icon: {
        backgroundColor: isActive ? '#619AFF' : '#B0B0B0',
      },
      footer: {
        backgroundColor: isActive ? '#7085DE' : '#A7A7A7',
      }
    }

    return (
      <View style={styles.container}>
        <View style={[styles.icon, activeStyle.icon]}>
          <Icon name={icon} color="#FFF" size={30} />
        </View>
        <View style={[styles.footer, activeStyle.footer]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    )
  }
}
