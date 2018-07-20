import React, { Component } from 'react'
import { TouchableOpacity, View, ScrollView, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import SearchActions from '../../Redux/SearchRedux'
import { Picker, Form, Item, Label, Input, Button } from 'native-base'
import RoundedButton from '../../Components/RoundedButton';
import Slider from 'react-native-slider'
import CATEGORIES from '../../Fixtures/categories.json'
import R from 'ramda'
import ViewOverflow from 'react-native-view-overflow'

import styles from './SearchTabStyle'
import { Colors } from '../../Themes';
import CategoryPill from '../../Components/Search/CategoryPill';
import SpecialistPill from '../../Components/Search/SpecialistPill';

class SearchTab extends Component {
  constructor(props) {
    super(props)

    this.onPressSearchNearby = this.onPressSearchNearby.bind(this)
    this.renderSpecialistPill = this.renderSpecialistPill.bind(this)
    this.renderServicePill = this.renderServicePill.bind(this)
  }

  onPressSearchNearby() {
    this.props.navigation.navigate({
      key: 'SearchNearbyScreen',
      routeName: 'SearchNearbyScreen'
    })
  }

  renderItemSeparator() {
    return <View style={{ margin: 5 }} />
  }

  renderServicePill({ item }) {
    const { category, setCategory, setSpecialist } = this.props

    return (
      <TouchableOpacity
        onPress={() => {
          setCategory(item.key)
          setSpecialist('all')
        }}
      >
        <CategoryPill data={item} selected={category} />
      </TouchableOpacity>
    )
  }

  renderSpecialistPill({ item }) {
    const { specialist, setSpecialist } = this.props

    return (
      <TouchableOpacity onPress={() => setSpecialist(item.key)}>
        <SpecialistPill data={item} selected={specialist} />
      </TouchableOpacity>
    )
  }

  renderServiceList() {
    return (
      <FlatList
        CellRendererComponent={ViewOverflow}
        renderItem={this.renderServicePill}
        extraData={this.props.category}
        data={CATEGORIES}
        ItemSeparatorComponent={this.renderItemSeparator}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    )
  }

  renderSpecialist() {
    const listData = R.find(R.propEq('key', this.props.category))(CATEGORIES)
    const all = {
      key: 'all',
      icon: 'all-inclusive',
      title: 'All'
    }

    return (
      <FlatList
        renderItem={this.renderSpecialistPill}
        extraData={this.props.specialist}
        data={[all, ...listData.data]}
        ItemSeparatorComponent={this.renderItemSeparator}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        horizontal
      />
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.section}>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Services</Text>
              {this.renderServiceList()}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Specialist</Text>
              {this.renderSpecialist()}
            </View>
            <ViewOverflow />

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Distance</Text>
              <Slider
                minimumValue={1}
                maximumValue={5}
                value={3}
                thumbTintColor={Colors.darkBlue}
                minimumTrackTintColor={Colors.lightBlue}
                thumbStyle={{ elevation: 2, width: 30 }}
                style={{ marginBottom: -7 }}
                trackStyle={{ height: 8, borderRadius: 10 }}
                onSlidingComplete={value => this.props.setDistance(value)}
              />
              <View style={{ flexDirection: 'row' }}>
                <View flex={1}>
                  <Text style={styles.rangeText}>1 km</Text>
                </View>
                <View flex={1} style={{ alignItems: 'center' }}>
                  <Text style={styles.rangeText}>2.5 km</Text>
                </View>
                <View flex={1} style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.rangeText}>5 km</Text>
                </View>
              </View>
            </View>
          </View>

          <RoundedButton
            text="Search Nearby"
            onPress={this.onPressSearchNearby}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    specialist: state.search.specialist,
    category: state.search.category,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSpecialist: (s) => dispatch(SearchActions.setSpecialist(s)),
    setCategory: (c) => dispatch(SearchActions.setCategory(c)),
    setDistance: (d) => dispatch(SearchActions.setDistance(d)),
    nearby: () => dispatch(SearchActions.nearby())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTab)
