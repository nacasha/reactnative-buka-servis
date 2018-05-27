import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: '#2293F4',
    flexDirection: 'row',
    elevation: 3
  },
  title: {
    color: '#FFF',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 14,
    fontSize: 18,
  },
  backButton: {
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
