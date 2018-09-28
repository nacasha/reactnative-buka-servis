import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/CategoryPillStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class CategoryPill extends Component {
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

  render () {
    const { data: { title, key, color }, selected } = this.props
    const isActive = key == selected ? true : false

    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.icon}>
          <Icon name="check-circle-outline" color={isActive ? '#FFF' : 'transparent'} size={19} />
        </View>
      </View>
    )
  }
}
