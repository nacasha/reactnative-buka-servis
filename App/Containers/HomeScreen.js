import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import MainTab from './HomeScreen/MainTab'
import SearchTab from './HomeScreen/SearchTab'
import CategoryTab from './HomeScreen/CategoryTab';

// Styles
import styles from './Styles/HomeScreenStyle'
import { Colors } from '../Themes';

class HomeScreen extends Component {
  renderTabBar = () => (
    <DefaultTabBar
      activeTextColor={Colors.darkBlue}
      inactiveTextColor='#888'
      style={{ height: 45 }}
      textStyle={{ fontWeight: 'normal', fontSize: 12 }}
      tabStyle={{ paddingBottom: 0 }}
      underlineStyle={{ height: 2, backgroundColor: Colors.darkBlue }}
    />
  )

  render () {
    return (
      <ScrollableTabView
        style={styles.container}
        prerenderingSiblingsNumber={1}
        renderTabBar={this.renderTabBar}>

        <MainTab tabLabel="HOME" navigation={this.props.navigation}/>
        {/* <CategoryTab tabLabel="CATEGORY" navigation={this.props.navigation}/> */}
        <SearchTab tabLabel="NEARBY" navigation={this.props.navigation}/>
      </ScrollableTabView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
