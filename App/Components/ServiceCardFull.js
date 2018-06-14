import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import styles from './Styles/ServiceCardFullStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'
import { MoneyFormat, RangeMoneyFormat, ConvertToPrice } from '../Transforms';


export default class ServiceCardFull extends Component {
  constructor(props) {
    super(props)

    this.onPress = _.debounce(this.props.onPress, 150)
  }

  render () {
    const { data } = this.props
    const { title, user, rating } = data
    const price = ConvertToPrice(data)

    return (
      <TouchableNativeFeedback onPress={this.onPress}>
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
              <Icon name="star" style={styles.ratingIcon} />
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
