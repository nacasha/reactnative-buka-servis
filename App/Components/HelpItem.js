import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableNativeFeedback } from 'react-native'
import styles from './Styles/HelpItemStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class HelpItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }

  state = {
    open: false
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    return (
      <View>
        <TouchableNativeFeedback onPress={this.toggleOpen}>
          <View style={styles.container}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Icon name={this.state.open ? 'chevron-up' : 'chevron-down' } size={18} />
          </View>
        </TouchableNativeFeedback>

        {this.state.open
          ? <Text style={styles.content}>{this.props.content}</Text>
          : <View />
        }
      </View>
    )
  }
}
