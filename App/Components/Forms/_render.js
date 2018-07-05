import { Input, Item, Label, Picker, Text, Textarea } from 'native-base'
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import MapView from 'react-native-maps'
import Modal from 'react-native-modal'
import RoundedButton from '../../Components/RoundedButton'
import { Images } from '../../Themes'
import styles from './FormStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CategoryTab from '../../Containers/HomeScreen/CategoryTab'

export const renderTextarea = ({ input, label, type, options, meta: { touched, error, warning } }) => {
  var hasError = false
  if (error !== undefined) {
    hasError = true
  }

  return (
    <View style={styles.item}>
      <Label style={styles.label}>{label}</Label>
      <Input {...input} {...options} style={styles.textArea}/>
      <Text style={styles.error}>{ hasError ? error : ''}</Text>
    </View>
  )
}

export const renderInput = ({ input, label, type, options, defaultValue, meta: { touched, error, warning } }) => {
  var hasError = false
  if (error !== undefined) {
    hasError = true
  }

  return (
    <View style={styles.item}>
      <Item stackedLabel error={hasError} style={styles.input}>
        <Label>{label}</Label>
        <Input {...input} {...options} />
      </Item>
      <Text style={styles.error}>{hasError ? error : ''}</Text>
    </View>
  )
}

export const renderPicker = ({ input, label, type, items, meta: { touched, error, warning } }) => {
  var hasError = false
  if (error !== undefined) {
    hasError = true
  }

  return (
    <View style={styles.item}>
      <Label style={styles.label}>{label}</Label>
      <Picker
        mode="dropdown"
        selectedValue={input.value}
        onValueChange={(value, index) => input.onChange(value)}
        {...input}
      >
        {items.map(item =>
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        )}
      </Picker>
      {hasError ? <Text style={styles.error}>{error}</Text> : <Text />}
    </View>
  )
}

export const renderLocationPicker = ({ input, label, type, meta: { touched, error, warning } }) => {
  input.value = {
    open: input.value.open || false,
    latitude: input.value.latitude || 0,
    longitude: input.value.longitude || 0,
  }

  return (
    <View style={styles.item}>
      <Label style={styles.label}>{label}</Label>

      <TouchableOpacity onPress={() => input.onChange({ ...input.value, open: true })}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: input.value.latitude || 37.78825,
              longitude: input.value.longitude || -122.4324,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            minZoomLevel={15}
            liteMode={true}>
            <MapView.Marker
              coordinate={{
                latitude: input.value.latitude || 37.78825,
                longitude: input.value.longitude || -122.4324
              }}
              image={Images.mapMarkerUser}
            />
          </MapView>
        </View>
      </TouchableOpacity>

      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={input.value.open}
        cacheEnabled={true}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => input.onChange({ ...input.value, open: false })}
      >
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <View style={styles.mapContainerFull}>
            <MapView
              style={styles.map}
              onRegionChangeComplete={(region) => input.onChange(
                {
                  open: true,
                  latitude: region.latitude,
                  longitude: region.longitude
                }
              )}
              initialRegion={{
                latitude: input.value.latitude || 37.78825,
                longitude: input.value.longitude || -122.4324,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04,
              }}>
            </MapView>
            <Image source={Images.mapMarkerUser} style={styles.mapMarker} />
          </View>
          <View style={styles.modalFooter}>
            <RoundedButton
              onPress={() => input.onChange({ ...input.value, open: false })}
              text="Done">
            </RoundedButton>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export const renderCategoryPicker = ({ input, label, type, meta: { touched, error, warning } }) => {
  var hasError = false
  if (error !== undefined) {
    hasError = true
  }

  input.value = {
    open: input.value.open || false,
    title: input.value.title || 'Select Category',
    category: input.value.category || 'help',
  }

  return (
    <View style={styles.item}>
      <Label style={styles.label}>{label}</Label>

      <TouchableOpacity onPress={() => input.onChange({ ...input.value, open: true })}>
        <View style={styles.categoryPicker}>
          <Icon name={input.value.category} size={20} />
          <Text style={styles.categoryText}>{input.value.title}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={input.value.open}
        cacheEnabled={true}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => input.onChange({ ...input.value, open: false })}
      >
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <CategoryTab onChange={(category, title) => input.onChange({ category, title, open: false })} />
        </View>
      </Modal>
    </View>
  )
}
