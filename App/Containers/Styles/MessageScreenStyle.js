import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.listWithIcon,
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  username: {
    fontSize: 16,
  },
  message: {
    fontSize: 13
  }
})
