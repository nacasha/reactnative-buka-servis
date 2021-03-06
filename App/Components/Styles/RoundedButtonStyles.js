import { StyleSheet } from 'react-native'
import { Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  button: {
    flex: 1,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
