import { ToastAndroid } from 'react-native';
import RNRestart from 'react-native-restart';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export function requestLocationService() {
  LocationServicesDialogBox.checkLocationServicesIsEnabled({
    message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
    ok: "YES",
    cancel: "NO",
    showDialog: true,
    openLocationServices: true,
    preventOutSideTouch: true,
    preventBackClick: false,
    providerListener: true
  }).then(function (success) {
    if (success.alreadyEnabled == false) {
      ToastAndroid.show('GPS Enabled, Restaring App', 2000)
      RNRestart.Restart();
    }
  }).catch((error) => {
    ToastAndroid.show('Some features are unavailable', 2000)
  })
}
