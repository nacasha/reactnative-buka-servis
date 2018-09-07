import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import { Colors } from '../Themes';
import _ from 'lodash'

export default class RoundedButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    busy: PropTypes.bool,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    children: PropTypes.string,
    background: PropTypes.string,
    navigator: PropTypes.object,
    debounce: PropTypes.bool
  }

  static defaultProps = {
    background: Colors.lightBlue,
    busy: false,
    disabled: false,
    debounce: false
  }

  constructor(props) {
    super(props)

    this.onPress = _.debounce(this.props.onPress, 150)
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style, { backgroundColor: this.props.background }]}
        disabled={this.props.disabled}
        onPress={this.props.onPress}>
        {this.props.busy
          ? <ActivityIndicator size={25} color="#FFF" />
          : <Text style={styles.buttonText}>{this.getText()}</Text>
        }
      </TouchableOpacity>
    )
  }
}
