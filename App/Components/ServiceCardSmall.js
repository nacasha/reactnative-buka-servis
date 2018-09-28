import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import styles from './Styles/ServiceCardSmallStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'
import { RangeMoneyFormat, MoneyFormat } from '../Transforms';

export default class ServiceCardSmall extends Component {
  constructor(props) {
    super(props)

    this.onPress = _.debounce(this.props.onPress, 150)
  }

  render () {
    const { data } = this.props
    const { title, description, user } = data
    if (data.priceRange !== '') {
      price = RangeMoneyFormat(data.price, data.priceRange)
    } else {
      price = MoneyFormat(data.price)
    }

    return (
      <TouchableNativeFeedback onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.price}>
            <Icon name="cash-multiple" style={styles.priceIcon} />
            <Text style={styles.priceText}>Rp. {price}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
