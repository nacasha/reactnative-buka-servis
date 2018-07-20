import React from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import RoundedButton from '../Components/RoundedButton';
import ServiceCardSmall from '../Components/ServiceCardSmall';
import FavoriteActions from '../Redux/FavoriteRedux';
import ModalActions from '../Redux/ModalRedux';
import StoreActions from '../Redux/StoreRedux';
import { Colors, Images } from '../Themes';
// Styles
import styles from './Styles/StoreDetailScreenStyle';

class StoreDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const favorite = navigation.getParam('favorite')
    const submitFavorite = navigation.getParam('submitFavorite')

    return {
      title: 'Store Detail',
      headerRight: (
        <TouchableOpacity onPress={submitFavorite}>
          <Icon
            name='heart'
            size={27}
            color={favorite ? 'red' : '#FFF'}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)

    const { navigation, favorites } = props
    const { data } = props.navigation.state.params

    this.storeId = data
    this.storeInfo = this.props.stores[data].info

    this.props.fetchStoreData(data)

    // Methods
    this.onMessage = this.onMessage.bind(this)
    this.onDirection = this.onDirection.bind(this)
    this.onServicePress = this.onServicePress.bind(this)
    this.submitFavorite = this.submitFavorite.bind(this)

    navigation.setParams({
      favorite: favorites[this.storeId],
      submitFavorite: this.submitFavorite
    })
  }

  shouldComponentUpdate({ navigation, favorites }) {
    if (this.props.favorites != favorites) {
      navigation.setParams({
        favorite: favorites[this.storeId]
      })
    }

    return true
  }

  submitFavorite() {
    if (this.props.loggedIn) {
      const state = !this.props.favorites[this.storeId]
      this.props.submitFavorite(state, this.storeId)
    } else {
      alert('Please sign in to your account')
    }
  }

  onServicePress = (data) => () => {
    this.props.navigation.navigate({
      key: `ServiceDetailScreen/${data.key}`,
      routeName: 'ServiceDetailScreen',
      params: { data, noInfo: true }
    })
  }

  onMessage() {
    if (this.props.loggedIn) {
      this.props.navigation.navigate({
        key: 'MessageDetailScreen',
        routeName: 'MessageDetailScreen',
        params: {
          storeId: this.storeId,
          storeName: this.storeInfo.name
        }
      })
    } else {
      alert('Please sign in to your account')
    }
  }

  onDirection() {
    this.props.navigation.navigate({
      key: 'StoreDirectionScreen',
      routeName: 'StoreDirectionScreen',
      params: {
        storeId: this.storeId,
        storeLocation: this.storeInfo.location
      }
    })
  }

  renderRow = ({ item }) => {
    return (
      <View style={styles.item}>
        <ServiceCardSmall data={item} onPress={this.onServicePress(item)} />
      </View>
    )
  }

  renderContactRow({ item }) {
    return (
      <View style={styles.contactItem}>
        <Image source={Images.social[item.type]} style={styles.contactItemIcon} />
        <Text>{item.value}</Text>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader() {
    return (
      <View style={{ marginBottom: 10 }}>
        <View style={styles.storeSection}>
          <Image source={{ uri: 'https://api.adorable.io/avatars/90/' + this.storeId }} style={styles.storeImage} />
          <Text style={styles.storeTitle}>{this.storeInfo.name}</Text>
          <Text style={styles.storeSubInfo}>
            <Icon name="map-marker" size={15} />
            {this.storeInfo.address}
          </Text>

          <View style={styles.storeStatus}>
            <Icon name="library-books" />
            <Text style={styles.gap}>
              {(this.props.stores[this.storeId].services || []).length}
            </Text>
            <Icon name="heart" color={Colors.red} />
            <Text style={styles.gap}>
              {(this.props.stores[this.storeId].favorites || []).length}
            </Text>
          </View>
        </View>

        <TouchableNativeFeedback onPress={() => this.props.openModal('contact')}>
          <View>
            <View pointerEvents="none" style={styles.itemSection}>
              <Text style={{ flex: 1 }}>Contacts</Text>
              <Icon name="chevron-right" size={20} />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  // Show this when data is empty
  renderEmpty = () =>
    <View style={styles.emptySection}>
      <Text style={styles.emptySectionText}>Nothing to show yet</Text>
    </View>

  renderSeparator = () =>
    <View style={styles.itemSeparator}/>

  renderSectionFooter = () =>
    <View style={styles.itemSeparator} />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => item.title
  keyExtractorContact = (item, index) => item.key

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

  renderFooter() {
    return (
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <RoundedButton
            text="Send Message"
            onPress={this.onMessage}
            debounce
          /></View>
        <View style={styles.footerItem}>
          <RoundedButton
            text="Direction"
            onPress={this.onDirection}
            background={Colors.green}
            debounce
          />
        </View>
      </View>
    )
  }

  renderContactModal() {
    return (
      <Modal
        isVisible={this.props.modalState.contact}
        useNativeDriver={true}
        onBackButtonPress={() => this.props.closeModal('contact')}
      >
        <View style={styles.contactModal}>
          <FlatList
            data={this.props.stores[this.storeId].contacts}
            renderItem={this.renderContactRow}
            keyExtractor={this.keyExtractorContact}
            initialNumToRender={this.oneScreensWorth}
            ListHeaderComponent={this.renderSeparator}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderSectionFooter}
          />
          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <RoundedButton
                text="Close"
                onPress={() => this.props.closeModal('contact')}
                background={Colors.lightBlue}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            {this.renderHeader()}
            <FlatList
              data={this.props.stores[this.storeId].services}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              ListEmptyComponent={this.renderEmpty}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderSectionFooter}
            />
          </ScrollView>
        </View>
        {this.renderFooter()}
        {this.renderContactModal()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalState: state.modal,
    loggedIn: state.user.loggedIn,
    stores: state.store.stores,
    favorites: state.user.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(ModalActions.openModal(modal)),
    closeModal: (modal) => dispatch(ModalActions.closeModal(modal)),
    fetchStoreData: (id) => dispatch(StoreActions.fetchStoreData(id)),
    submitFavorite: (state, storeId) => dispatch(FavoriteActions.submit(state, storeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetailScreen)
