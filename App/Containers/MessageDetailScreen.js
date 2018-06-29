import React, { Component } from 'react'
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat'
import HeaderBar from '../Components/HeaderBar'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import MessageActions from '../Redux/MessageRedux'

// Styles
import styles from './Styles/MessageDetailScreenStyle'

class MessageDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title={navigation.state.params.storeName} back={() => navigation.pop()} />
  })

  constructor(props) {
    super(props)

    const { messageId, storeName, storeId } = props.navigation.state.params
    this.messageId = messageId
    this.storeName = storeName
    this.storeId = storeId
  }

  onSend(messages = []) {
    this.props.sendMessage(messages, this.messageId, this.storeId, this.storeName)
  }

  render () {
    return (
      <View style={styles.container}>
        <GiftedChat
          renderAvatar={null}
          messages={this.props.messages}
          onSend={messages => this.onSend(messages)}
          user={{ _id: this.props.user.uid }}
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
