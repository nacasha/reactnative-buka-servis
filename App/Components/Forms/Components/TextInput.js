import { Input, Label, Item } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './FormStyles';

export default class TextInput extends React.Component {
  render() {
    const { input, label, options, meta: { touched, error, warning } } = this.props
    var hasError = false
    if (error !== undefined) {
      hasError = true
    }

    return (
      <View style={styles.item}>
        <Item stackedLabel error={hasError} style={styles.input}>
          <Label>{label}</Label>
          <Input {...input} {...options} />
        </Item>
        <Text style={styles.error}>{hasError ? error : ''}</Text>
      </View>
    )
  }
}
