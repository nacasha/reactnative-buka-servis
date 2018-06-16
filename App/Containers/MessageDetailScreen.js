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

    const { storeId, storeName } = props.navigation.state.params
    this.storeId = storeId
    this.storeName = storeName
  }

  onSend(messages = []) {
    this.props.sendMessage(messages, this.storeId)
  }

  render () {
    return (
      <View style={styles.container}>
        <GiftedChat
          renderAvatar={null}
          messages={this.props.messages[this.storeId]}
          onSend={messages => this.onSend(messages)}
          user={{ _id: this.props.user.uid }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    messages: state.message.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (data, id) => dispatch(MessageActions.sendMessage(data, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailScreen)
