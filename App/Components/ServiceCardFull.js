import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import styles from './Styles/ServiceCardFullStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import R from 'ramda'
import { MoneyFormat, RangeMoneyFormat, ConvertToPrice } from '../Transforms';
import { Colors } from '../Themes';


export default class ServiceCardFull extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.data.title == nextProps.data.title) {
      return false
    }

    return true
  }

  render () {
    const { data, onPress } = this.props
    const { title, user, rating } = data
    const price = ConvertToPrice(data)

    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.price}>
            <Icon name="cash-multiple" style={styles.priceIcon} />
            <Text style={styles.priceText}>Rp. {price}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.store}>
              <Icon name="store" style={styles.storeIcon} />
              <Text>{user.name}</Text>
            </View>
            <View style={styles.rating}>
              <Text>{Number(rating || 0).toFixed(1)}</Text>
              <Icon name="star" color={Colors.gold} style={styles.ratingIcon} />
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
