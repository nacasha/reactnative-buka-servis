import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    borderRadius: Metrics.borderRadius,
    height: 115,
    backgroundColor: '#FFF',
    elevation: 4,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 25
  },
  cardButton: {
    flexDirection: 'row',
    marginHorizontal: 20,
    right: 0,
    height: 50,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  cardButtonItem: {
    padding: 7,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardFooter: {
    marginTop: Metrics.smallMargin,
    flexDirection: 'row',
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  storeAddress: {
    fontSize: 13,
    color: '#777'
  },
  footerItem: {
    flex: 1
  },
  footerItemTitle: {
    fontSize: 12,
    color: '#777'
  },
  footerItemText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  smallText: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#777'
  },
  iconFavorite: {
    paddingLeft: 3,
    fontSize: 13,
    fontWeight: 'normal',
    color: 'red'
  },
  iconService: {
    paddingLeft: 3,
    fontSize: 13,
    fontWeight: 'normal',
    color: Colors.darkBlue
  }
})
