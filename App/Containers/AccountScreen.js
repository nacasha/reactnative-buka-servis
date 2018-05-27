import React from 'react'
import { View, SectionList, Text, Image, TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Styles
import styles from './Styles/AccountScreenStyle'
import { Metrics, Colors } from '../Themes';

class AccountScreen extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    data: [
      {
        key: 'Account',
        data: [
          { icon: 'map-marker', title: 'Change Location', description: 'Tenth Description' },
          { icon: 'email', title: 'Change Email', description: 'First Description' },
          { icon: 'account-edit', title: 'Edit Profile', description: 'Second Description' },
          { icon: 'logout', title: 'Logout', description: 'Third Description' },
        ]
      }, {
        key: 'Service',
        data: [
          { icon: 'library-books', title: 'List', description: 'Eleventh Description' },
          { icon: 'library-plus', title: 'Add Service', description: 'Eleventh Description' },
        ]
      }, {
        key: 'Application',
        data: [
          { icon: 'history', title: 'Version', description: 'Eleventh Description' },
          { icon: 'application', title: 'About', description: 'Eleventh Description' },
        ]
      },
    ]
  }

  /* ***********************************************************
  * STEP 3
  * `renderItem` function - How each cell should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
  *   return <MyCustomCell title={item.title} description={item.description} />
  *
  * For sections with different cells (heterogeneous lists), you can do branch
  * logic here based on section.key OR at the data level, you can provide
  * `renderItem` functions in each section.
  *
  * Note: You can remove section/separator functions and jam them in here
  *************************************************************/
  renderItem ({section, item}) {
    return (
      <TouchableNativeFeedback>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Icon name={item.icon} size={22} />
          </View>
          <View style={styles.itemRight}>
            <Text style={styles.username}>{item.title}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderSectionHeader ({section}) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{section.key}</Text>
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
  renderHeader = () =>
    <View style={[styles.item, { paddingHorizontal: Metrics.baseMargin }]}>
      <View style={styles.accountItemLeft}>
        <Image source={{ uri: 'https://api.adorable.io/avatars/50/izal' }} style={styles.accountImage} />
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.accountUsername}>Izal Fathoni</Text>
        <View style={styles.accountStatus}>
          <Icon name="library-books" size={15} />
          <Text style={styles.accountStatusText}>2</Text>
          <Icon name="heart" size={15} color={Colors.error} />
          <Text style={styles.accountStatusText}>18</Text>
          <Icon name="star" size={15} color={Colors.yellow} />
          <Text style={styles.accountStatusText}>18</Text>
        </View>
      </View>
    </View>

  renderSectionFooter = () =>
    <View style={styles.sectionFooter} />

  renderItemSeparator = () =>
    <View style={[styles.itemSeparator, { marginLeft: 50 }]} />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

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
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          sections={this.state.data}
          contentContainerStyle={styles.listContent}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          renderSectionFooter={this.renderSectionFooter}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
