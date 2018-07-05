import React from 'react'
import { View, Text, FlatList, TouchableNativeFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import HeaderBar from '../../Components/HeaderBar'
import { SwipeRow } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './Styles/ListContactScreenStyle'
import { Images } from '../../Themes';
import ContactActions from '../../Redux/ContactRedux'
import _ from 'lodash'

class ListContactScreen extends React.PureComponent {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Manage Contact',
    headerRight: (
      <TouchableOpacity onPress={() => navigate({
        key: 'FormContactScreen',
        routeName: 'FormContactScreen'
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

  onPress = (contactData) => {
    this.props.navigation.navigate({
      key: 'FormContactScreen',
      routeName: 'FormContactScreen',
      params: { contactData }
    })
  }

  renderRow = ({ item }) => {
    return (
      <SwipeRow
        style={{ borderBottomWidth: 0, marginVertical: -10 }}
        disableRightSwipe={true}
        rightOpenValue={-80}
        body={
          <TouchableNativeFeedback onPress={() => this.onPressDelayed(item)}>
            <View style={{ width: '150%' }}>
              <View pointerEvents="none" style={styles.contactItem}>
                <Image source={Images.social[item.type]} style={styles.contactItemIcon} />
                <Text>{item.value}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        }
        right={
          <TouchableNativeFeedback onPress={() => this.props.delete(item.key)}>
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
      <Text style={styles.emptySectionText}>No contacts available</Text>
    </View>

  renderItemSeparator = () =>
    <View style={styles.itemSeparator} />

  keyExtractor = (item, index) => item.key

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.contacts}
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
    contacts: state.user.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (contactId) => dispatch(ContactActions.delete({ contactId }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContactScreen)
