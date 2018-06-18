import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: '#2293F4',
    flexDirection: 'row',
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
  },
  rightButton: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  rightIcon: {
    paddingLeft: 14,
  }
})
