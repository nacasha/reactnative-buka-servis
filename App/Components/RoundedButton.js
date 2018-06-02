import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback, Text, ActivityIndicator, View } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Colors } from '../Themes';
import _ from 'lodash'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('Rounded Button', () =>
  <RoundedButton
    text='real buttons have curves'
    onPress={() => window.alert('Rounded Button Pressed!')}
  />
)

export default class RoundedButton extends Component {
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
      <TouchableNativeFeedback
        disabled={this.props.disabled}
        onPress={this.props.debounce ? this.onPress : this.props.onPress}>
        <View style={[styles.button, { backgroundColor: this.props.background }]}>
          {this.props.busy
            ? <ActivityIndicator size={25} color="#FFF" />
            : <Text style={styles.buttonText}>{this.getText()}</Text>
          }
        </View>
      </TouchableNativeFeedback>
    )
  }
}
