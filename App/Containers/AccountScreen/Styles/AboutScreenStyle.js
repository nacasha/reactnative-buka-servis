import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 180
  },
  title: {
    fontSize: Fonts.size.h4,
    fontWeight: 'bold',
    color: Colors.facebook,
    textAlign: 'center'
  },
  paragraph: {
    marginTop: Metrics.smallMargin,
  },
  footer: {
    marginTop: Metrics.baseMargin,
    alignItems: 'center'
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: Fonts.size.regular
  }
})
