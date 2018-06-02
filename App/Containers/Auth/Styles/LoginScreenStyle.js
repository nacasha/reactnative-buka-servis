import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  footer: {
    marginTop: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    justifyContent: 'center',
    padding: Metrics.smallMargin
  }
})
