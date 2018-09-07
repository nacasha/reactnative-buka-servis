import R from 'ramda';
import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import DirectionActions from '../Redux/DirectionRedux';
import GeoLocationAtions from '../Redux/GeoLocationRedux';
import ShowToast from '../Services/ShowToast';
import { Images } from '../Themes';
import styles from './Styles/StoreDirectionScreenStyle';

class StoreDirectionScreen extends Component {
  static navigationOptions = {
    title: 'Store Direction'
  }

  constructor(props) {
    super(props)
    const { storeId, storeLocation } = props.navigation.state.params

    if (props.userLatitude === 0) {
      ShowToast('danger', 'Unable to get user location', 5000)
      this.props.getCurrentPosition()
    }

    this.storeId = storeId
    this.storeLocation = storeLocation
    this.props.fetchDirection(storeLocation, storeId)

    this.fitToCoordinates = this.fitToCoordinates.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.directions[this.storeId] != undefined) {
      this.mapView.fitToCoordinates(
        R.values(nextProps.directions[this.storeId])
      )
    }
  }

  fitToCoordinates() {
    if (this.props.directions[this.storeId] != undefined) {
      this.mapView.fitToCoordinates(
        R.values(this.props.directions[this.storeId])
      )
    }
  }

  render () {
    const coordinates = R.values(this.props.directions[this.storeId])

    return (
      <View style={styles.mapContainer}>
        <MapView
          ref={e => this.mapView = e}
          style={styles.map}
          onMapReady={() => this.fitToCoordinates()}
          initialRegion={{
            latitude: this.storeLocation.latitude,
            longitude: this.storeLocation.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          cacheEnabled={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.props.userLatitude,
              longitude: this.props.userLongitude
            }}
            image={Images.mapMarkerUser}
          />
          <MapView.Marker
            coordinate={{
              latitude: this.storeLocation.latitude,
              longitude: this.storeLocation.longitude
            }}
            image={Images.mapMarkerStore}
          />
          <MapView.Polyline
            coordinates={coordinates}
            strokeWidth={5}
            strokeColor="#4fb477"
          />
        </MapView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stores: state.store.stores,
    directions: state.direction.directions,
    userLatitude: state.geolocation.coords.latitude,
    userLongitude: state.geolocation.coords.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentPosition: () => dispatch(GeoLocationAtions.getCurrentPosition()),
    fetchDirection: (loc, id) => dispatch(DirectionActions.fetch(loc, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDirectionScreen)
