import React, { Component } from 'react'
import { TouchableOpacity, View, ScrollView, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import SearchActions from '../../Redux/SearchRedux'
import ModalActions from '../../Redux/ModalRedux'
import RoundedButton from '../../Components/RoundedButton';
import Slider from 'react-native-slider'
import CATEGORIES from '../../Fixtures/categories.json'
import R from 'ramda'
import ViewOverflow from 'react-native-view-overflow'
import Modal from 'react-native-modal';
import styles from './SearchTabStyle'
import { Colors } from '../../Themes';
import CategoryPill from '../../Components/Search/CategoryPill';
import SpecialistPill from '../../Components/Search/SpecialistPill';
import { requestLocationService } from '../../Services/DeviceRequest';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
class SearchTab extends Component {
  constructor(props) {
    super(props)

    this.onPressSearchNearby = this.onPressSearchNearby.bind(this)
    this.renderSpecialistPill = this.renderSpecialistPill.bind(this)
    this.renderServicePill = this.renderServicePill.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.specialist != nextProps.specialist) {
      return true
    }
    if (this.props.category != nextProps.category) {
      return true
    }
    if (this.props.coords != nextProps.coords) {
      return true
    }
    if (this.props.modalState != nextProps.modalState) {
      return true
    }
    if (this.props.geo_busy != nextProps.geo_busy) {
      return true
    }

    return false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fetching == true && nextProps.fetching == false) {
      if (nextProps.results.length > 0) {
        this.props.closeModal('searching')
        this.props.navigation.navigate({
          key: 'SearchNearbyScreen',
          routeName: 'SearchNearbyScreen'
        })
      } else {
        this.props.closeModal('searching')
        alert('Not found')
      }
    }
  }

  onPressSearchNearby() {
    this.props.openModal('searching')

    this.props.startFetching()
    this.props.resetSearch()
    this.props.nearby()
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

  renderModal() {
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={this.props.modalState.searching}
        useNativeDriver={true}
        onBackButtonPress={() => this.props.closeModal('searching')}
      >
        <View style={styles.searchingModal}>
          <Pulse size={30} color="#FFF" />
          <Text style={styles.searchingText}>
            Searching
          </Text>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
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
                value={this.props.distance}
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
                  <Text style={styles.rangeText}>3 km</Text>
                </View>
                <View flex={1} style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.rangeText}>5 km</Text>
                </View>
              </View>
            </View>
          </View>

          { this.props.geo_busy
            ?
            <RoundedButton
              background="#A7A7A7"
              text="Waiting for User Location"
              onPress={() => { }}
              disabled
            />
            :
            this.props.coords.latitude == 0
              ?
              <RoundedButton
                background={Colors.error}
                text="Enable GPS"
                onPress={() => { requestLocationService() }}
              />

              :
              <RoundedButton
                text="Search Nearby"
                onPress={this.onPressSearchNearby}
              />
          }
        </View>
        {this.renderModal()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.search.fetching,
    modalState: state.modal,
    specialist: state.search.specialist,
    category: state.search.category,
    coords: state.geolocation.coords,
    geo_busy: state.geolocation.busy,
    results: state.search.results,
    distance: state.search.distance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(ModalActions.openModal(modal)),
    closeModal: (modal) => dispatch(ModalActions.closeModal(modal)),
    setSpecialist: (s) => dispatch(SearchActions.setSpecialist(s)),
    setCategory: (c) => dispatch(SearchActions.setCategory(c)),
    setDistance: (d) => dispatch(SearchActions.setDistance(d)),
    startFetching: () => dispatch(SearchActions.request()),
    resetSearch: () => dispatch(SearchActions.reset()),
    nearby: () => dispatch(SearchActions.nearby())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTab)
