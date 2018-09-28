import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    padding: 0
  },
  infoSection: {
    padding: Metrics.baseMargin
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
  ratingSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingGap: {
    marginHorizontal: 3
  },
  ratingInfoIcon: {
    fontSize: 18,
    marginRight: 3
  },
  storeSection: {
    backgroundColor: '#F7F7F7',
    padding: Metrics.baseMargin,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  },
  storeImage: {
    width: 45,
    height: 45,
    borderRadius: Metrics.borderRadius
  },
  storeInfo: {
    marginHorizontal: Metrics.smallMargin
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.facebook
  },
  storeSubInfo: {
    color: '#999',
    fontSize: 13.5,
    marginTop: 3
  },
  descSection: {
    padding: Metrics.baseMargin
  },
  descTitle: {
    fontSize: Fonts.size.regular
  },
  desc: {
    lineHeight: 25
  },
  ratingModal: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    height: 100,
    width: 250,
    borderRadius: Metrics.borderRadius,
  },
  reportModal: {
    height: 400,
    padding: Metrics.baseMargin,
    backgroundColor: '#FFF',
    borderRadius: Metrics.borderRadius,
  },
  starStyle: {
    marginHorizontal: 5
  }
})
