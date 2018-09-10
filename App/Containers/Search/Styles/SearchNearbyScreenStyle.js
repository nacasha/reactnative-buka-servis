import { StatusBar, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    borderRadius: Metrics.borderRadius,
    overflow: 'hidden',
    height: 150,
    backgroundColor: '#FFF',
    elevation: 3
  },
  cardHeader: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.headerbar
  },
  cardFooter: {
    padding: 15,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 10
  },
  storeImage: {
    width: 35,
    height: 35,
    borderRadius: 35,
    borderWidth: 1,
    padding: 3,
    borderColor: '#FFF'
  },
  storeDistance: {
    fontSize: 15,
    color: '#999'
  },
  cardContainer: {
    marginHorizontal: Metrics.baseMargin
  },
  cardSwiper: {
    height: 170,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenHeight
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  statusbar: {
    height: StatusBar.currentHeight + 30,
    width: Metrics.screenWidth,
    position: 'absolute',
    top: 0,
    paddingLeft: 15,
    paddingRight: 15,
  }
})
