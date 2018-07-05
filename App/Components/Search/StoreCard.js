import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './Styles/StoreCardStyle'

export default class StoreCard extends Component {

  renderLoading() {
    return (
      <View style={styles.card}>
        <View style={styles.overlay}>
          <ActivityIndicator size={35} color="#FFF" />
        </View>

        <View style={styles.cardHeader}>
          <View style={styles.storeImage}></View>
          <View style={{ flex: 1 }}>
          </View>
        </View>
        <View style={styles.cardFooter}>
        </View>
      </View>
    )
  }

  renderCard() {
    const { data, info } = this.props
    const distance = Number(data.distance).toFixed(2)

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: 'https://api.adorable.io/avatars/90/' + data.key }} style={styles.storeImage} />
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{info.info.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={styles.storeDistance}>{distance} km</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter} style={styles.cardButton}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={styles.cardButtonText}>VIEW INFO</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const { data, info } = this.props

    return info ? this.renderCard() : this.renderLoading()
  }
}
