import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableNativeFeedback, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import HeaderBar from '../Components/HeaderBar';
import RoundedButton from '../Components/RoundedButton';
import ServiceCardSmall from '../Components/ServiceCardSmall';
import FavoriteActions from '../Redux/FavoriteRedux';
import StoreActions from '../Redux/StoreRedux';
import { Colors } from '../Themes';
import R from 'ramda'
// Styles
import styles from './Styles/StoreDetailScreenStyle';

class StoreDetailScreen extends React.PureComponent {
  static navigationOptions = {
    header: null
  }
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
    this.storeId = data
    this.storeInfo = this.props.stores[data].info

    this.props.fetchStoreData(data)

    // Methods
    this.onMessage = this.onMessage.bind(this)
    this.onDirection = this.onDirection.bind(this)
    this.onServicePress = this.onServicePress.bind(this)
    this.submitFavorite = this.submitFavorite.bind(this)
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
    this.props.navigation.navigate({
      key: 'MessageDetailScreen',
      routeName: 'MessageDetailScreen'
    })
  }

  onDirection() {
    this.props.navigation.navigate({
      key: 'MessageDetailScreen',
      routeName: 'MessageDetailScreen'
    })
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({item}) => {
    return (
      <View style={styles.item}>
        <ServiceCardSmall data={item} onPress={this.onServicePress(item)} />
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

        <TouchableNativeFeedback onPress={this.props.closeRatingModal}>
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
    <View style={{ padding: 30 }}>
      <ActivityIndicator size={30} />
    </View>

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

  renderFooter() {
    return (
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
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar
          title="Store Detail"
          back={() => this.props.navigation.pop()}
          right={[
            {
              color: this.props.favorites[this.storeId] ? 'red' : 'white',
              icon: 'heart',
              action: () => this.submitFavorite()
            }
          ]}
        />

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
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    stores: state.store.stores,
    favorites: state.favorite.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStoreData: (id) => dispatch(StoreActions.fetchStoreData(id)),
    submitFavorite: (state, storeId) => dispatch(FavoriteActions.submit(state, storeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetailScreen)
