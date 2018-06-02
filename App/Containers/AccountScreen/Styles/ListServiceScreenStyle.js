import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.listWithIcon,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
  },
  serviceTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  action: {
    flexDirection: 'row',
    backgroundColor: Colors.error,
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionText: {
    color: '#FFF',
    fontSize: Fonts.size.regular,
    marginHorizontal: Metrics.baseMargin
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  priceIcon: {
    color: Colors.green,
    fontSize: 19,
    marginRight: 3
  },
})
