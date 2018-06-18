import React from 'react'
import { ActivityIndicator, View, SectionList, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ServiceCardFull from '../../Components/ServiceCardFull'

// More info here: https://facebook.github.io/react-native/docs/sectionlist.html

// Styles
import styles from './MainTabStyle'

class MainTab extends React.PureComponent {
  onPress = (data) => () => {
    this.props.navigation.navigate({
      key: 'ServiceDetailScreen',
      routeName: 'ServiceDetailScreen',
      params: { data }
    })
  }

  renderItem = ({section, item}) => {
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

  // Conditional branching for section headers, also see step 3
  renderSectionHeader ({section}) {
    return (
      <View style={styles.sectionHeader}>
        <Icon name="star" size={15} style={styles.sectionIcon} />
        <Text style={styles.sectionLabel}>{section.key}</Text>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 2
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *
  * Removing a function here will make SectionList use default
  *************************************************************/
  // Show this when data is empty
  renderEmpty = () =>
    <View style={styles.emptySection}>
      <ActivityIndicator size={30} />
    </View>

  renderSeparator = () =>
    <View style={styles.itemSeparator} />

  renderSectionFooter = () =>
    <View style={styles.itemSeparator} />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => item.key

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    return (
      <View style={styles.container}>
        <FlatList
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
    feeds: state.feed.feeds,
    stores: state.store.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTab)
