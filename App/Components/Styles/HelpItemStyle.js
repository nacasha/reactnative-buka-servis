import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  title: {
    flex: 1
  },
  content: {
    padding: Metrics.baseMargin,
    backgroundColor: '#F9F9F9',
  }
})
