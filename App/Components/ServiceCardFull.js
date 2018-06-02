import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import styles from './Styles/ServiceCardFullStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'


export default class ServiceCardFull extends Component {
  constructor(props) {
    super(props)

    this.onPress = _.debounce(this.props.onPress, 150)
  }

  render () {
    return (
      <TouchableNativeFeedback onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={styles.title}>Install Ulang Windows 7/8/10</Text>
          <View style={styles.price}>
            <Icon name="cash-multiple" style={styles.priceIcon} />
            <Text style={styles.priceText}>Rp. 400000 ~ 500000</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.store}>
              <Icon name="store" style={styles.storeIcon} />
              <Text>Margonda Store</Text>
            </View>
            <View style={styles.rating}>
              <Text>4.5</Text>
              <Icon name="star" style={styles.ratingIcon} />
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
