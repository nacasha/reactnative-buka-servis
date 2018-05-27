import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
  },
  bottomBorder: {
   borderBottomWidth: 1,
   borderBottomColor: '#EEEEEE',
   marginLeft: 50 + (Metrics.baseMargin * 2),
   marginRight: 10
  },
  image: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: Metrics.baseMargin
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  message: {
    fontSize: 14
  }
})
