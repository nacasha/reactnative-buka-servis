import React from 'react'
import { View, Text, FlatList, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../Components/HeaderBar'
import { SwipeRow } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MoneyFormat, RangeMoneyFormat } from '../../Transforms'
import _ from 'lodash'
import ServiceActions from '../../Redux/ServiceRedux'

// Styles
import styles from './Styles/ListServiceScreenStyle'
import { Metrics, Colors } from '../../Themes';

class ListServiceScreen extends React.PureComponent {
  static navigationOptions = ({ navigation: { navigate }}) => ({
    title: 'List Service',
    headerRight: (
      <TouchableOpacity onPress={() => navigate({
        key: 'FormServiceScreen',
        routeName: 'FormServiceScreen'
      })}>
        <Icon
          name='plus'
          size={27}
          color={'#FFF'}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
    )
  })

  constructor(props) {
    super(props)

    this.onPressDelayed = _.debounce(this.onPress, 150)
  }

  onPress = (data) => {
    this.props.navigation.navigate({
      key: 'EditServiceScreen',
      routeName: 'EditServiceScreen',
      params: { data }
    })
  }

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

  renderEmpty = () =>
    <View style={styles.emptySection}>
      <Text style={styles.emptySectionText}>No services available</Text>
    </View>

  renderItemSeparator = () =>
    <View style={styles.itemSeparator} />

  keyExtractor = (item, index) => item.key

  oneScreensWorth = 20

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
    services: state.user.services
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteService: (id) => dispatch(ServiceActions.delete(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListServiceScreen)
