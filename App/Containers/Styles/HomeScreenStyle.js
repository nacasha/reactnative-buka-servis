import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    padding: 0,
    backgroundColor: '#FFF'
  },
  tab: {
    height: 100,
    borderWidth: 1
  }
})
