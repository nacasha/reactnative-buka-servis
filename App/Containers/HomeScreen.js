import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import MainTab from './HomeScreen/MainTab'
import SearchTab from './HomeScreen/SearchTab'
import CategoryTab from './HomeScreen/CategoryTab';

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  render () {
    return (
      <ScrollableTabView
        prerenderingSiblingsNumber={1}
        style={styles.container}>

        <MainTab tabLabel="Home" />
        <CategoryTab tabLabel="Category" />
        <SearchTab tabLabel="Search" />
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
