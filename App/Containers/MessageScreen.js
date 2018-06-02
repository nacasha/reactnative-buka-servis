import React from 'react'
import { View, Text, FlatList, TouchableNativeFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import MessageActions from '../Redux/MessageRedux'

// Styles
import styles from './Styles/MessageScreenStyle'
import LoginRequired from '../Components/LoginRequired';

class MessageScreen extends React.PureComponent {
  openMessage = (item) => () => {
    console.log(this.props.messages)
  }

  renderRow = ({item}) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple()}
        onPress={this.openMessage(item)}>
        <View style={styles.item}>
          <View style={styles.itemLeft} pointerEvents="none">
            <Image source={{ uri: 'https://api.adorable.io/avatars/50/' + item.image }} style={styles.image} />
          </View>
          <View style={styles.itemRight} pointerEvents="none">
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.message}>{item.message}</Text>
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

  keyExtractor = (item, index) => item.username

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        {this.props.loggedIn
          ?
          <FlatList
            data={this.props.messages}
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
    messages: state.message.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)
