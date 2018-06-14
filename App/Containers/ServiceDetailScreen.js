import React, { Component } from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../Components/HeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RoundedButton from '../Components/RoundedButton'
import Rating from 'react-native-rating'
import Modal from 'react-native-modal'
import RatingActions from '../Redux/RatingRedux'
import _ from 'lodash'

// Styles
import styles from './Styles/ServiceDetailScreenStyle'
import { Colors, Images } from '../Themes';
import { ConvertToPrice } from '../Transforms';

class ServiceDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title="Detail" back={() => navigation.pop()} />
  })

  constructor(props) {
    super(props)

    const { data } = props.navigation.state.params
    let ratings = false

    if (this.props.user) {
      ratings = this.props.ratings[data.key]
      // Sync ratings from firebase
      props.syncRating(data.key)
    }

    // Initial state
    this.data = data
    this.storeInfo = this.props.stores[data.user].info
    this.ratingAverage = ratings ? ratings.ratingAverage : data.rating
    this.ratingCount = ratings ? (ratings.length) - 1 : data.ratingCount
    this.userRating = ratings ? ratings[props.user.uid] : 0

    // Methods
    this.onStoreDetail = this.onStoreDetail.bind(this)
    this.onReport = this.onReport.bind(this)
    this.openRatingModal = this.openRatingModal.bind(this)
    this.submitRating = this.submitRating.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user) {
      const ratings = nextProps.ratings[this.data.key]

      this.ratingAverage = ratings.ratingAverage
      this.ratingCount = Object.keys(ratings).length - 1
      this.userRating = ratings[nextProps.user.uid]
    }
  }

  onStoreDetail() {
    this.props.navigation.navigate({
      key: 'StoreDetailScreen',
      routeName: 'StoreDetailScreen',
      params: { data: this.data.user }
    })
  }

  onReport() {
    this.props.navigation.navigate({
      key: 'StoreDetailScreen',
      routeName: 'StoreDetailScreen'
    })
  }

  openRatingModal() {
    if (this.props.user) {
      this.props.openRatingModal()
    } else {
      alert('Please Sign in to your account')
    }
  }

  submitRating() {
    this.props.submitRating(this.userRating, this.data.key)
    this.props.closeRatingModal()
  }

  renderRatingInfo() {
    return (
      <View style={styles.ratingSection}>
        <Rating
          initial={this.ratingAverage}
          editable={false}
          selectedStar={Images.rating.starFilled}
          unselectedStar={Images.rating.starUnfilled}
        />
        <View style={styles.ratingInfo}>
          <Icon name="star" style={styles.ratingInfoIcon} />
          <Text>{Number(this.ratingAverage || 0).toFixed(1)}</Text>
          <View style={styles.ratingGap}></View>
          <Icon name="account-multiple" style={styles.ratingInfoIcon} />
          <Text>{this.ratingCount}</Text>
        </View>
        <TouchableOpacity onPress={this.openRatingModal}>
          <Text style={styles.textButton}>GIVE RATING</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderStoreInfo() {
    return (
      <View style={styles.storeSection}>
        <Image source={{ uri: 'https://api.adorable.io/avatars/50/' + this.storeInfo.uid }} style={styles.storeImage} />
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{this.storeInfo.name}</Text>
          <Text style={styles.storeSubInfo}>
            <Icon name="map-marker" size={15} />
            {this.storeInfo.address}
          </Text>
        </View>
      </View>
    )
  }

  renderServiceDescription() {
    return (
      <View style={styles.descSection}>
        <Text style={styles.descTitle}>Service Description</Text>
        <Text style={styles.desc}>
          {this.data.description}
        </Text>
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.props.navigation.state.params.noInfo
        ?
          <View style={styles.footerItem}>
            <RoundedButton
              text="Report"
              onPress={this.onReport}
              background={Colors.red}
            />
          </View>
        :
          <View style={{ flexDirection: 'row', flex: 1 }}>
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
        }
      </View>
    )
  }

  renderModal() {
    return (
      <Modal
        isVisible={this.props.ratingModalVisible}
        onBackButtonPress={this.props.closeRatingModal}
        useNativeDriver={true}
      >
        <View style={styles.ratingModal}>
          <Rating
            initial={this.userRating}
            selectedStar={Images.rating.starFilled}
            unselectedStar={Images.rating.starUnfilled}
            onChange={(rating) => this.userRating = rating}
          />
          <TouchableOpacity onPress={this.submitRating}>
            <Text style={styles.textButton}>DONE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  render() {
    const price = ConvertToPrice(this.data)

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.infoSection}>
            <Text style={styles.title}>{this.data.title}</Text>
            <View style={styles.price}>
              <Icon name="cash-multiple" style={styles.priceIcon} />
              <Text style={styles.priceText}>Rp. {price}</Text>
            </View>
          </View>

          {this.renderRatingInfo()}
          {this.renderStoreInfo()}
          {this.renderServiceDescription()}
        </ScrollView>

        {this.renderFooter()}
        {this.renderModal()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    stores: state.store.stores,
    ratings: state.rating.ratings,
    ratingModalVisible: state.rating.modalVisible,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openRatingModal: () => dispatch(RatingActions.openModal()),
    closeRatingModal: () => dispatch(RatingActions.closeModal()),
    syncRating: (id) => dispatch(RatingActions.syncRating(id)),
    submitRating: (r, id) => dispatch(RatingActions.submit(r, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailScreen)
