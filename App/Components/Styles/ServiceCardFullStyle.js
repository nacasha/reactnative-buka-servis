import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    elevation: 2,
    flex: 1,
    padding: Metrics.smallMargin,
    backgroundColor: Colors.background,
    borderRadius: Metrics.borderRadius
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  priceIcon: {
    color: Colors.green,
    fontSize: 19,
    marginRight: 3
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.baseMargin
  },
  store: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  storeIcon: {
    fontSize: 17,
    marginRight: 3
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 17,
    marginLeft: 3,
    color: Colors.gold
  }
})
