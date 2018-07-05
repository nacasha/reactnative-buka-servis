import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import GeoLocationAtions from '../../Redux/GeoLocationRedux';
import SearchActions from '../../Redux/SearchRedux';
import ShowToast from '../../Services/ShowToast';
import { Images, Metrics } from '../../Themes';
import styles from './Styles/SearchNearbyScreenStyle';
import StoreCard from '../../Components/Search/StoreCard';
import Carousel from 'react-native-snap-carousel'
import R from 'ramda'

class SearchNearbyScreen extends Component {
  static navigationOptions = {
    title: 'Store Nearby'
  }

  constructor(props) {
    super(props)

    // Check if user location is available or no
    if (props.userLatitude === 0) {
      // Show warning to user
      ShowToast('danger', 'Unable to get user location', 5000)
    } else {
      this.props.resetSearch()
      setTimeout(() => {
        props.nearby()
      }, 500)
    }

    this.renderCard = this.renderCard.bind(this)
    this.onCardPress = this.onCardPress.bind(this)
  }

  onCardPress(data) {
    console.log(data)
    this.props.navigation.navigate({
      key: 'StoreDetailScreen',
      routeName: 'StoreDetailScreen',
      params: { data }
    })
  }

  //#region RENDER
  renderCard({ item }) {
    const info = this.props.storeInfo[item.key]

    return <StoreCard data={item} info={info} onPress={() => this.onCardPress(item.key)} />
  }

  renderCardSwiper() {
    return (
      <Carousel
        data={this.props.nearbyResults}
        renderItem={this.renderCard}
        sliderWidth={Metrics.screenWidth}
        extraData={this.props.storeInfo}
        itemWidth={Metrics.screenWidth - 45}
      />
    );
  }

  renderStores() {
    return this.props.nearbyResults.map(item => {
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
            cacheEnabled={true}
          >
            <MapView.Circle
              center={{
                latitude: this.props.userLatitude,
                longitude: this.props.userLongitude
              }}
              radius={this.props.radius * 1000}
              strokeColor='rgba(57, 141, 63, 0.6)'
              fillColor='rgba(57, 141, 63, 0.2)'
            />
            <MapView.Marker
              coordinate={{
                latitude: this.props.userLatitude,
                longitude: this.props.userLongitude
              }}
              image={Images.mapMarkerUser}
            />

            {this.renderStores()}
          </MapView>
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
    radius: state.search.radius,
    storeInfo: state.store.stores,
    nearbyResults: state.search.filteredNearby,
    userLatitude: state.geolocation.coords.latitude,
    userLongitude: state.geolocation.coords.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentPosition: () => dispatch(GeoLocationAtions.getCurrentPosition()),
    resetSearch: () => dispatch(SearchActions.reset()),
    nearby: () => dispatch(SearchActions.nearby())
  }
}
//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(SearchNearbyScreen)
