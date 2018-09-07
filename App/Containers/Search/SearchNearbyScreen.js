import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import GeoLocationAtions from '../../Redux/GeoLocationRedux';
import SearchActions, { nearbyFilter } from '../../Redux/SearchRedux';
import ShowToast from '../../Services/ShowToast';
import { Images, Metrics, Colors } from '../../Themes';
import styles from './Styles/SearchNearbyScreenStyle';
import StoreCard from '../../Components/Search/StoreCard';
import Carousel from 'react-native-snap-carousel'
import LinearGradient from 'react-native-linear-gradient';
import ViewOverflow from 'react-native-view-overflow'
import R from 'ramda'

class SearchNearbyScreen extends Component {
  static navigationOptions = {
    title: 'Store Nearby',
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: StatusBar.currentHeight,
      left: 0,
      right: 0,
    },
    headerTintColor: '#444'
  }

  constructor(props) {
    super(props)

    props.startFetching()
    // Check if user location is available or no
    if (props.userLatitude === 0) {
      // Show warning to user
      ShowToast('danger', 'Unable to get user location', 5000)
    } else {
      props.resetSearch()
      props.nearby()
    }

    this.renderCard = this.renderCard.bind(this)
    this.onCardPress = this.onCardPress.bind(this)
    this.onCardPressDirection = this.onCardPressDirection.bind(this)
  }

  shouldComponentUpdate(nextProps) {
      return true
  }

  onCardPress(data) {
    this.props.navigation.navigate({
      key: 'StoreDetailScreen',
      routeName: 'StoreDetailScreen',
      params: { data }
    })
  }

  onCardPressDirection(storeId, storeLocation) {
    this.props.navigation.navigate({
      key: 'StoreDirectionScreen',
      routeName: 'StoreDirectionScreen',
      params: {
        storeId: storeId,
        storeLocation: storeLocation
      }
    })
  }

  //#region RENDER
  renderCard({ item }) {
    const info = this.props.storeInfo[item.key]

    return (
      <StoreCard
        data={item}
        info={info}
        onPress={() => this.onCardPress(item.key)}
        onPressDirection={() => this.onCardPressDirection(item.key, info.info.location)}
      />
    )
  }

  renderCardSwiper() {
    return (
      <Carousel
        data={this.props.results}
        renderItem={this.renderCard}
        sliderWidth={Metrics.screenWidth}
        CellRendererComponent={ViewOverflow}
        extraData={this.props.storeInfo}
        itemWidth={Metrics.screenWidth - 30}
        onSnapToItem={index => {
          this.mapView.animateToCoordinate({
            latitude: this.props.results[index].location[0],
            longitude: this.props.results[index].location[1],
          })
        }}
      />
    )
  }

  renderMarkerStore() {
    return this.props.results.map(item => {
      return (
        <MapView.Marker
          key={item.key}
          coordinate={{
            latitude: item.location[0],
            longitude: item.location[1]
          }}
          image={Images.mapMarkerStore}
        />
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={e => this.mapView = e}
            style={styles.map}
            initialRegion={{
              latitude: this.props.userLatitude,
              longitude: this.props.userLongitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
          >
            <MapView.Circle
              center={{
                latitude: this.props.userLatitude,
                longitude: this.props.userLongitude
              }}
              radius={this.props.distance * 1000}
              strokeColor='rgba(57, 141, 63, 0.6)'
              fillColor='rgba(57, 141, 63, 0.1)'
            />
            <MapView.Marker
              coordinate={{
                latitude: this.props.userLatitude,
                longitude: this.props.userLongitude
              }}
              image={Images.mapMarkerUser}
            />

            {this.renderMarkerStore()}
          </MapView>
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)',]}
            style={styles.statusbar}
          />
        </View>

        <View style={styles.cardSwiper}>
          {this.renderCardSwiper()}
        </View>
      </View>
    )
  }
  // #endregion
}

//#region REDUX
const mapStateToProps = (state) => {
  return {
    fetching: state.search.fetching,
    distance: state.search.distance,
    storeInfo: state.store.stores,
    results: state.search.results,
    userLatitude: state.geolocation.coords.latitude,
    userLongitude: state.geolocation.coords.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startFetching: () => dispatch(SearchActions.request()),
    getCurrentPosition: () => dispatch(GeoLocationAtions.getCurrentPosition()),
    resetSearch: () => dispatch(SearchActions.reset()),
    nearby: () => dispatch(SearchActions.nearby())
  }
}
//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(SearchNearbyScreen)
