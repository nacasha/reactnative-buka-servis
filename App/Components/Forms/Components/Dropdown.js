import { Label, Picker } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './FormStyles';

export default class Dropdown extends React.PureComponent {
  render() {
    const { input, label, items, meta: { touched, error, warning } } = this.props

    var hasError = false
    if (error !== undefined) {
      hasError = true
    }

    return (
      <View style={styles.item}>
        <Label style={styles.label}>{label}</Label>
        <Picker
          mode="dropdown"
          selectedValue={input.value}
          onValueChange={(value, index) => input.onChange(value)}
          {...input}
        >
          {items.map(item =>
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          )}
        </Picker>
        {hasError ? <Text style={styles.error}>{error}</Text> : <Text />}
      </View>
    )
  }
}
