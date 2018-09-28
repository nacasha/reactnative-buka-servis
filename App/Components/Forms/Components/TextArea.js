import { Input, Label } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './FormStyles';

export default class TextArea extends React.PureComponent {
  render() {
    const { input, label, options, meta: { touched, error, warning } } = this.props
    var hasError = false
    if (error !== undefined) {
      hasError = true
    }

    return (
      <View style={styles.item}>
        <Label style={styles.label}>{label}</Label>
        <Input {...input} {...options} style={styles.textArea} />
        <Text style={styles.error}>{hasError ? error : ''}</Text>
      </View>
    )
  }
}
