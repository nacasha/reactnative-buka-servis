import React from 'react'
import { ScrollView, ActivityIndicator, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ServiceCardFull from '../../Components/ServiceCardFull'
import styles from './MainTabStyle'

class MainTab extends React.PureComponent {
  onPress = (data) => () => {
    this.props.navigation.navigate({
      key: 'ServiceDetailScreen',
      routeName: 'ServiceDetailScreen',
      params: { data }
    })
  }

  renderItem = ({item}) => {
    const data = {
      ...item,
      user: this.props.stores[item.user].info
    }

    return (
      <View style={styles.item}>
        <ServiceCardFull data={data} onPress={this.onPress(item)} />
      </View>
    )
  }

  renderSectionHeader ({section}) {
    return (
      <View style={styles.sectionHeader}>
        <Icon name="star" size={15} style={styles.sectionIcon} />
        <Text style={styles.sectionLabel}>{section.key}</Text>
      </View>
    )
  }

  renderEmpty = () =>
    <View style={styles.emptySection}>
      <ActivityIndicator size={30} />
    </View>

  renderSeparator = () =>
    <View style={styles.itemSeparator} />

  renderSectionFooter = () =>
    <View style={styles.itemSeparator} />

  keyExtractor = item => item.key

  oneScreensWorth = 20

  render () {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          style={styles.listContent}
          data={this.props.feeds}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    feeds: state.feed.feeds,
    stores: state.store.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTab)
