import React from 'react'
import { View, Text, FlatList, TouchableNativeFeedback, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import MessageActions from '../Redux/MessageRedux'
import R from 'ramda'

// Styles
import styles from './Styles/MessageScreenStyle'
import LoginRequired from '../Components/LoginRequired';

class MessageScreen extends React.PureComponent {
  openMessage = (storeId, storeName) => () => {
    this.props.navigation.navigate({
      key: 'MessageDetailScreen',
      routeName: 'MessageDetailScreen',
      params: { storeId, storeName }
    })
  }

  renderRow = ({item}) => {
    const info = { ...this.props.userInfo[item] }
    let lastMessage = []

    console.log(this.props.messages[item])

    if (this.props.messages[item] == undefined) {
      lastMessage = { text: 'Loading' }
    } else if (this.props.messages[item].length == 0) {
      lastMessage = { text: 'Loading' }
    } else {
      lastMessage = this.props.messages[item][0]
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple()}
        onPress={this.openMessage(item, info.name)}>
        <View style={styles.item}>
          <View style={styles.itemLeft} pointerEvents="none">
            <Image source={{ uri: 'https://api.adorable.io/avatars/50/' + info.name }} style={styles.image} />
          </View>
          <View style={styles.itemRight} pointerEvents="none">
            <Text style={styles.username}>{info.name || 'Loading ...'}</Text>
            <Text style={styles.message}>{lastMessage.text}</Text>
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

  keyExtractor = (item, index) => item

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        {this.props.loggedIn
          ?
            <FlatList
              extraData={this.props}
              data={this.props.userList ? this.props.userList : []}
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
    messages: state.message.messages,
    userInfo: state.message.userInfo,
    userList: state.message.userList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)
