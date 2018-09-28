import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ServiceCardFull from '../../Components/ServiceCardFull'
import styles from './MainTabStyle'
import FeedActions from '../../Redux/FeedRedux';

class MainTab extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onPress = this.onPress.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onPress(data) {
    const { navigation } = this.props

    navigation.navigate({
      key: 'ServiceDetailScreen',
      routeName: 'ServiceDetailScreen',
      params: { data }
    })
  }

  onRefresh() {
    const { feedRequest } = this.props

    feedRequest()
  }

  renderItem = ({item}) => {
    const data = {
      ...item,
      user: this.props.stores[item.user].info
    }

    return (
      <View style={styles.item}>
        <ServiceCardFull data={data} onPress={() => this.onPress(item)} />
      </View>
    )
  }

  renderEmpty = () =>
    <View style={styles.emptySection}>
      <Text>Nothing to show yet</Text>
    </View>

  renderSeparator = () =>
    <View style={styles.itemSeparator} />

  keyExtractor = item => item.key

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={this.props.fetching}
          onRefresh={this.onRefresh}
          data={this.props.feeds}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderSeparator}
          ListFooterComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.feed.fetching,
    feeds: state.feed.feeds,
    stores: state.store.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    feedRequest: () => dispatch(FeedActions.feedRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTab)
