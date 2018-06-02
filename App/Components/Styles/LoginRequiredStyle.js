import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.baseMargin
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: Metrics.doubleBaseMargin
  },
  text: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
  },
  buttonSection: {
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin
  }
})
