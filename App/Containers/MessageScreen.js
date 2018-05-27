import React from 'react'
import { View, Text, FlatList, TouchableNativeFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import MessageItem from '../Components/MessageItem'

// Styles
import styles from './Styles/MessageScreenStyle'

class MessageScreen extends React.PureComponent {
  state = {
    dataObjects: [
      {
        image: 'izal',
        username: 'Izal',
        message: 'First Description',
      },
      {
        image: 'karina',
        username: 'Karina',
        message: 'Tes Tes 123',
      },
      {
        image: 'nacashsa',
        username: 'Nacasha',
        message: 'Terima kasih atas pesanan anda',
      },
      {
        image: 'febri',
        username: 'Febri',
        message: 'Halo selamat siang',
      }
    ]
  }

  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
  }

  openMessage = (item) => () => {
    this.props.navigation.navigate({
      key: 'MessageDetailScreen',
      routeName: 'MessageDetailScreen',
      params: {
        data: item
      }
    })
  }

  renderRow ({item}) {
    return (
      <TouchableNativeFeedback onPress={this.openMessage(item)}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Image source={{ uri: 'https://api.adorable.io/avatars/50/' + item.image }} style={styles.image} />
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderItemSeparator = () =>
    <View style={[styles.itemSeparator, { marginLeft: 80 }]} />

  keyExtractor = (item, index) => item.username

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderItemSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)
