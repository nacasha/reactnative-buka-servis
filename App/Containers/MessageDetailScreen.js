import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { GiftedChat, Day, Bubble } from 'react-native-gifted-chat'
import HeaderBar from '../Components/HeaderBar'
import MessageActions from '../Redux/MessageRedux'

import styles from './Styles/MessageDetailScreenStyle'

class MessageDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.storeName
  })

  constructor(props) {
    super(props)

    const { messageId, storeName, storeId } = props.navigation.state.params
    this.messageId = messageId
    this.storeName = storeName
    this.storeId = storeId

    if (this.props.user.uid == this.storeId) {
      Alert.alert(
        'Error',
        'Unable to send messages to self',
        [
          { text: 'Close', style: 'cancel', onPress: () => this.props.navigation.pop() }
        ],
        { cancelable: true, onDismiss: () => this.props.navigation.pop() }
      )
    }
  }

  onSend(messages = []) {
    this.props.sendMessage(
      messages,
      this.messageId,
      this.storeId,
      this.storeName
    )
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFF',
          }
        }}
      />
    );
  }

  renderDay(props) {
    return (
      <Day
        {...props}
        textStyle={{ color: '#FFF' }}
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <GiftedChat
          renderAvatar={null}
          messages={this.props.messages}
          onSend={messages => this.onSend(messages)}
          user={{ _id: this.props.user.uid }}
          renderBubble={this.renderBubble}
          renderDay={this.renderDay}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { storeId } = props.navigation.state.params

  return {
    user: state.user.data,
    messages: state.user.messageDetail[storeId]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (data, id, uid, name) => dispatch(MessageActions.sendMessage(data, id, uid, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailScreen)
