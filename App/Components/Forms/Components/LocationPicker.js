import React from 'react'
import { Label } from 'native-base'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import MapView from 'react-native-maps'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import RoundedButton from '../../RoundedButton'
import { Images } from '../../../Themes'
import styles from './FormStyles'
import ModalActions from '../../../Redux/ModalRedux'
import GeoLocationActions from '../../../Redux/GeoLocationRedux'

class LocationPicker extends React.PureComponent {
  constructor(props) {
    super(props)

    this.openModal = this.openModal.bind(this)
  }

  openModal() {
    const { latitude, longitude } = this.props

    if (latitude !== 0 && longitude !== 0) {
      this.props.openModal()
    } else {
      this.props.getCurrentPosition()
    }
  }

  render() {
    const { input, label, latitude, longitude } = this.props

    return (
      <View style={styles.item}>
        <Label style={styles.label}>{label}</Label>

        <TouchableOpacity onPress={this.openModal}>
          <View style={styles.mapContainer}>
            { (latitude !== 0 && longitude !== 0)
              ? <MapView
                style={styles.map}
                region={{
                  latitude: input.value.latitude || latitude,
                  longitude: input.value.longitude || longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                minZoomLevel={15}
                liteMode={true}>
                <MapView.Marker
                  coordinate={{
                    latitude: input.value.latitude || latitude,
                    longitude: input.value.longitude || longitude
                  }}
                  image={Images.mapMarkerUser}
                />
              </MapView>
              :
              <View style={styles.mapWarning}>
                <Text style={styles.mapWarningText}>
                  Unable to get user location, please enable GPS and tap here
                </Text>
              </View>
            }
          </View>
        </TouchableOpacity>

        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={this.props.modalState}
          cacheEnabled={true}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          onBackButtonPress={this.props.closeModal}
        >
          <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.mapContainerFull}>
              {(latitude !== 0 && longitude !== 0) &&
              <MapView
                style={styles.map}
                onRegionChangeComplete={(region) => input.onChange(
                  {
                    latitude: region.latitude,
                    longitude: region.longitude
                  }
                )}
                initialRegion={{
                  latitude: input.value.latitude || latitude,
                  longitude: input.value.longitude || longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                }}>
              </MapView>
              }
              <Image source={Images.mapMarkerUser} style={styles.mapMarker} />
            </View>
            <View style={styles.modalFooter}>
              <RoundedButton
                onPress={this.props.closeModal}
                text="Done">
              </RoundedButton>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalState: state.modal.locationPicker,
    latitude: state.geolocation.coords.latitude,
    longitude: state.geolocation.coords.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentPosition: () => dispatch(GeoLocationActions.getCurrentPosition()),
    openModal: () => dispatch(ModalActions.openModal('locationPicker')),
    closeModal: () => dispatch(ModalActions.closeModal('locationPicker')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationPicker)
