import React, { Component } from 'react'
import { View, ScrollView, Image, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../Components/HeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/ServiceDetailScreenStyle'
import { Colors } from '../Themes';
import { RangeMoneyFormat, MoneyFormat } from '../Transforms';

class ServiceDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title="Detail" back={() => navigation.pop()} />
  })

  onStoreDetail = () => {
    this.props.navigation.navigate({
      key: 'StoreDetailScreen',
      routeName: 'StoreDetailScreen',
      params: {
        data: this.props.navigation.state.params.data.user
      }
    })
  }

  onReport = () => {
    this.props.navigation.navigate({
      key: 'StoreDetailScreen',
      routeName: 'StoreDetailScreen'
    })
  }

  render () {
    const { data } = this.props.navigation.state.params
    if (data.priceRange !== '') {
      price = RangeMoneyFormat(data.price, data.priceRange)
    } else {
      price = MoneyFormat(data.price)
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.infoSection}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.price}>
              <Icon name="cash-multiple" style={styles.priceIcon} />
              <Text style={styles.priceText}>Rp. {price}</Text>
            </View>
          </View>

          <View style={styles.storeSection}>
            <Image source={{ uri: 'https://api.adorable.io/avatars/50/' + data.user.email }} style={styles.storeImage} />
            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>{data.user.name}</Text>
              <Text style={styles.storeSubInfo}>
                <Icon name="map-marker" size={15} />
                {data.user.address}
              </Text>
            </View>
          </View>

          <View style={styles.descSection}>
            <Text style={styles.descTitle}>Service Description</Text>
            <Text style={styles.desc}>
              {data.description}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <RoundedButton
              text="Owner Info"
              onPress={this.onStoreDetail}
            /></View>
          <View style={styles.footerItem}>
            <RoundedButton
              text="Report"
              onPress={this.onReport}
              background={Colors.red}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailScreen)
