import React from 'react'
import { View, Text, FlatList, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../Components/HeaderBar'
import { SwipeRow, Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MoneyFormat, RangeMoneyFormat } from '../../Transforms'
import ActionButton from 'react-native-action-button';
import _ from 'lodash'
import ServiceActions from '../../Redux/ServiceRedux'
import firebase from 'react-native-firebase'

// Styles
import styles from './Styles/ListServiceScreenStyle'
import { Metrics, Colors } from '../../Themes';

class ListServiceScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar
      title="List Service"
      back={() => navigation.pop()}
      right={[
        {
          icon: 'plus',
          action: () => navigation.navigate({
            key: 'FormServiceScreen',
            routeName: 'FormServiceScreen'
          })
        }
      ]}
    />
  })

  constructor(props) {
    super(props)

    this.onPressDelayed = _.debounce(this.onPress, 150)
  }

  componentDidMount() {
    this.props.fetchServices()
  }

  onPress = (data) => {
    this.props.navigation.navigate({
      key: 'EditServiceScreen',
      routeName: 'EditServiceScreen',
      params: { data }
    })
  }

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {id: '1', title: 'Install Ulang Windows 7/8/10', price: ['400000', '500000']},
      {id: '2', title: 'Install Driver Windows 10', price: ['100000', '125000']},
      {id: '3', title: 'Fix Boot Loop', price: ['60000', '75000']},
      {id: '4', title: 'Maintenance Laptop', price: '120000'},
      {id: '5', title: 'Jasa Service LCD Laptop', price: '400000'},
    ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow = ({ item }) => {
    if (item.priceRange !== '') {
      price = RangeMoneyFormat(item.price, item.priceRange)
    } else {
      price = MoneyFormat(item.price)
    }

    return (
      <SwipeRow
        style={{ borderBottomWidth: 0, marginVertical: -10 }}
        disableRightSwipe={true}
        rightOpenValue={-80}
        body={
          <TouchableNativeFeedback onPress={() => this.onPressDelayed(item)}>
            <View style={{ width: '150%', padding: Metrics.baseMargin }}>
              <Text pointerEvents="none" style={styles.serviceTitle}>{item.title}</Text>

              <View pointerEvents="none" style={styles.price}>
                <Icon name="cash-multiple" style={styles.priceIcon} />
                <Text style={styles.priceText}>Rp. {price}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        }
        right={
          <TouchableNativeFeedback onPress={() => this.props.deleteService(item.key)}>
            <View style={styles.action}>
              <Icon name="delete" color="#FFF" size={25} />
            </View>
          </TouchableNativeFeedback>
        }
      />
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Show this when data is empty
  renderEmpty = () =>
    <View style={styles.emptySection}>
      <Text style={styles.emptySectionText}>No services available</Text>
    </View>

  renderItemSeparator = () =>
    <View style={styles.itemSeparator} />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => item.key

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
          data={this.props.services}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderItemSeparator}
          ListFooterComponent={this.renderItemSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.service.fetching,
    services: state.service.services
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchServices: () => dispatch(ServiceActions.fetch()),
    deleteService: (id) => dispatch(ServiceActions.delete(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListServiceScreen)
