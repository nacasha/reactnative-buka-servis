import React from 'react'
import { TouchableNativeFeedback, TouchableOpacity, Image, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../Components/HeaderBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RoundedButton from '../Components/RoundedButton'
import Rating from 'react-native-rating'
import Modal from 'react-native-modal'
import RatingActions from '../Redux/RatingRedux'
import StoreActions from '../Redux/StoreRedux'

// Styles
import styles from './Styles/StoreDetailScreenStyle'
import { Colors, Images } from '../Themes'
import ServiceCardSmall from '../Components/ServiceCardSmall'

class StoreDetailScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title="Store Detail" back={() => navigation.pop()} />
  })
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {title: 'Install Ulang Android', price: '150000'},
      {title: 'Ganti LCD', price: '150000'},
      {title: 'Repair Bootloop Android', price: '150000'},
      {title: 'Reset Account Iphone', price: '150000'},
      {title: 'Ganti Baterai IPhone', price: '150000'},
    ]
  }

  constructor(props) {
    super(props)

    const { data } = props.navigation.state.params
    props.fetchStoreDetail(data.email)

    this.data = data
    this.meta = props.stores[data.email]
  }

  onMessage = () => {
    this.props.navigation.navigate({
      key: 'MessageDetailScreen',
      routeName: 'MessageDetailScreen'
    })
  }

  onDirection = () => {
    this.props.navigation.navigate({
      key: 'MessageDetailScreen',
      routeName: 'MessageDetailScreen'
    })
  }

  submitRating = () => {
    alert('submitted')
    this.props.closeRatingModal()
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    return (
      <View style={styles.item}>
        <ServiceCardSmall data={item} onPress={() => {}} />
      </View>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <View style={{ marginBottom: 10 }}>
      <View style={styles.storeSection}>
        <Image source={{ uri: 'https://api.adorable.io/avatars/90/' + this.data.email }} style={styles.storeImage} />
        <Text style={styles.storeTitle}>{this.data.name}</Text>
        <Text style={styles.storeSubInfo}>
          <Icon name="map-marker" size={15} />
          {this.data.address}
        </Text>
        <View style={styles.storeStatus}>
          <Icon name="star" color={Colors.yellow} />
          <Text style={styles.gap}>4.5</Text>
          <Icon name="heart" color={Colors.red} />
          <Text style={styles.gap}>{this.meta.favorites.length}</Text>
        </View>
      </View>

      <TouchableNativeFeedback onPress={this.props.openRatingModal}>
        <View>
          <View pointerEvents="none" style={styles.itemSection}>
            <Text style={{ flex: 1 }}>Your Rating</Text>
            <Icon name="chevron-right" size={20} />
          </View>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={this.props.closeRatingModal}>
        <View>
          <View pointerEvents="none" style={styles.itemSection}>
            <Text style={{ flex: 1 }}>Contacts</Text>
            <Icon name="chevron-right" size={20} />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - No Services Available - </Text>

  renderSeparator = () =>
    <View style={styles.itemSeparator}/>

  renderSectionFooter = () =>
    <View style={styles.itemSeparator} />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => item.title

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.meta.services}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderSectionFooter}
        />
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <RoundedButton
              text="Send Message"
              onPress={this.onMessage}
            /></View>
          <View style={styles.footerItem}>
            <RoundedButton
              text="Direction"
              onPress={this.onDirection}
              background={Colors.green}
            />
          </View>
        </View>

        <Modal
          isVisible={this.props.ratingModalVisible}
          onBackButtonPress={this.props.closeRatingModal}
          useNativeDriver={true}
        >
          <View style={styles.ratingModal}>
            <Rating
              selectedStar={Images.rating.starFilled}
              unselectedStar={Images.rating.starUnfilled}
            />
            <TouchableOpacity onPress={this.submitRating}>
              <Text style={styles.textButton}>DONE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ratingModalVisible: state.rating.modalVisible,
    stores: state.store.stores,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStoreDetail: (id) => dispatch(StoreActions.fetchStoreDetail(id)),
    openRatingModal: () => dispatch(RatingActions.openModal()),
    closeRatingModal: () => dispatch(RatingActions.closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetailScreen)
