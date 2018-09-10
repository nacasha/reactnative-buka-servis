import { ToastAndroid, DeviceEventEmitter } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export function requestLocationService() {
  LocationServicesDialogBox.checkLocationServicesIsEnabled({
    message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
    ok: "YES",
    cancel: "NO",
    enableHighAccuracy: true,
    showDialog: true,
    openLocationServices: true,
    preventOutSideTouch: true,
    preventBackClick: false,
    providerListener: true
  }).then(function (success) {
    ToastAndroid.show('Location service enabled', 2000)
  }).catch((error) => {
    ToastAndroid.show('Some features are unavailable', 2000)
  })
}
