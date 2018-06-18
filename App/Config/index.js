import React from 'react'
import { Text, YellowBox } from 'react-native'
import DebugConfig from './DebugConfig'
import AppConfig from './AppConfig'

// Allow/disallow font-scaling in app
Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !DebugConfig.yellowBox

  // Disable deprecated warnings on new major update React Native
  YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader'
  ])

  // const { whyDidYouUpdate } = require('why-did-you-update');
  // whyDidYouUpdate(React);
}
