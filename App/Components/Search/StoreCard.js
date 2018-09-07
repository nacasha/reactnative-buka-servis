import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './Styles/StoreCardStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import R from 'ramda'
import ViewOverflow from 'react-native-view-overflow'
import fastDeepEqual from 'fast-deep-equal'

export default class StoreCard extends Component {

  shouldComponentUpdate(nextProps) {
    if (R.keys(nextProps.info).length == 4) {
      if (fastDeepEqual(this.props.info, nextProps.info)) {
        return false
      }

      return true
    }

    return false
  }

  renderLoading() {
    return (
      <View style={styles.card}>
        <ActivityIndicator size={30} />
      </View>
    )
  }

  renderCard() {
    const { data, info } = this.props

    const distance = Number(data.distance).toFixed(2)

    return (
      <View style={styles.mainContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.storeName}>{info.info.name}</Text>
              <Text style={styles.storeAddress}>{info.info.address}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.footerItem}>
              <Text style={styles.footerItemTitle}>Services</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.footerItemText}>
                  {info.services.length}
                </Text>
                <Icon name="library-books" style={styles.iconService} />
              </View>
            </View>

            <View style={styles.footerItem}>
              <Text style={styles.footerItemTitle}>Favorited</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.footerItemText}>
                  {info.favorites.length}
                </Text>
                <Icon name="heart" style={styles.iconFavorite} />
              </View>
            </View>

            <View style={styles.footerItem}>
              <Text style={styles.footerItemTitle}>Distance</Text>
              <Text style={styles.footerItemText}>
                {distance} <Text style={styles.smallText}>Km</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardButton}>
          <TouchableOpacity onPress={this.props.onPressDirection}>
            <View style={styles.cardButtonItem}>
              <Icon name="directions" size={20} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.cardButtonItem}>
              <Icon name="library-books" size={20} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.cardButtonItem}>
              <Icon name="heart" size={20} />
            </View>
          </TouchableOpacity>
          <ViewOverflow />
        </View>
      </View>
    )
  }

  render () {
    const { info } = this.props
    const isAvailable = R.keys(info).length == 4

    return isAvailable ? this.renderCard() : this.renderLoading()
  }
}
