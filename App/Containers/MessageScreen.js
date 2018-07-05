import React from 'react'
import { View, Text, FlatList, TouchableNativeFeedback, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import Moment from 'moment'
// Styles
import styles from './Styles/MessageScreenStyle'
import LoginRequired from '../Components/LoginRequired';
import SortMessages from '../Transforms/SortMessages'
class MessageScreen extends React.PureComponent {
  openMessage = (messageId, storeName, storeId) => () => {
    this.props.navigation.navigate({
      key: 'MessageDetailScreen',
      routeName: 'MessageDetailScreen',
      params: { messageId, storeName, storeId }
    })
  }

  renderRow = ({item}) => {
    const { uid, messageId, name, lastMessage, lastTimestamp } = item

    let time = Moment(lastTimestamp).calendar(Moment(), {
      sameDay: 'HH:mm',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'DD/MM/YYYY'
    })

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple()}
        onPress={this.openMessage(messageId, name, uid)}>
        <View style={styles.item}>
          <View style={styles.itemLeft} pointerEvents="none">
            <Image source={{ uri: 'https://api.adorable.io/avatars/50/' + uid }} style={styles.image} />
          </View>
          <View style={styles.itemRight} pointerEvents="none">
            <View style={styles.itemInfo}>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.message}>{lastMessage}</Text>
            </View>
            <View style={styles.itemTime}>
              <Text style={styles.textTime}>{time}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderEmpty = () =>
    <View style={styles.emptySection}>
      <Text style={styles.emptySectionText}>No messages sent</Text>
    </View>

  renderItemSeparator = () =>
    <View style={[styles.itemSeparator, { marginLeft: 80 }]} />

  keyExtractor = (item, index) => item.uid

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        {this.props.loggedIn
          ?
            <FlatList
              extraData={this.props}
              data={SortMessages(this.props.messages)}
              renderItem={this.renderRow}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              ListEmptyComponent={this.renderEmpty}
              ItemSeparatorComponent={this.renderItemSeparator}
            />
          : <LoginRequired navigation={this.props.navigation} />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    messages: state.user.messages,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)
