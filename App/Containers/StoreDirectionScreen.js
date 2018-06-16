import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import DirectionActions from '../Redux/DirectionRedux'
import R from 'ramda'

// Styles
import styles from './Styles/StoreDirectionScreenStyle'
import { Images } from '../Themes';
import HeaderBar from '../Components/HeaderBar'
import { Toast } from 'native-base';

class StoreDirectionScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <HeaderBar title="Store Direction" back={() => navigation.pop()} />
  })

  constructor(props) {
    super(props)
    const { storeId, storeLocation } = props.navigation.state.params

    if (props.userLatitude === 0) {
      Toast.show({
        text: 'Unable to get user location',
        text: text,
        type: 'danger',
        buttonText: 'Close',
        duration: 2500
      })
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
            latitude: this.storeLocation._latitude,
            longitude: this.storeLocation._longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          cacheEnabled
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
              latitude: this.storeLocation._latitude,
              longitude: this.storeLocation._longitude
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
    userLatitude: state.geolocation.latitude,
    userLongitude: state.geolocation.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDirection: (loc, id) => dispatch(DirectionActions.fetch(loc, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreDirectionScreen)
