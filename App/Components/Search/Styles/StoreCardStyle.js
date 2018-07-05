import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    borderRadius: Metrics.borderRadius,
    overflow: 'hidden',
    height: 115,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardButton: {
    padding: 10,
  },
  cardButtonText: {
    color: Colors.darkBlue,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  storeInfo: {
    flex: 1,
    marginHorizontal: 10
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
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
    fontSize: 13,
    color: '#EEE'
  },
  overlay: {
    width: Metrics.screenWidth - 45,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    position: 'absolute',
    flex: 1,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})
