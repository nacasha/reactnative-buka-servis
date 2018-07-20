import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/SpecialistCardStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class SpecialistCard extends Component {
  state = {
    active: false
  }

  render() {
    const { active } = this.state
    const { title, icon } = this.props.data

    if (active) {
      activeStyle = {
        backgroundColor: color
      }
    } else {
      activeStyle = {
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        borderColor: '#BBB'
      }
    }

    return (
      <TouchableOpacity onPress={() => { }}>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Icon name={icon} color="#FFF" size={30} />
          </View>
          <View style={styles.footer}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
