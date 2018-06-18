import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DDD'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
  },
  storeSection: {
    backgroundColor: '#F7F7F7',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.baseMargin
  },
  storeImage: {
    width: 90,
    height: 90,
    borderRadius: Metrics.borderRadius,
    marginBottom: Metrics.smallMargin
  },
  storeTitle: {
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    marginBottom: 3
  },
  storeStatus: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  gap: {
    marginHorizontal: 3
  },
  item: {
    marginHorizontal: Metrics.smallMargin
  },
  itemSeparator: {
    padding: 5
  },
  itemSection: {
    padding: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    flexDirection: 'row'
  },
  contactModal: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: Metrics.borderRadius,
  },
  contactItem: {
    flexDirection: 'row',
    marginHorizontal: Metrics.smallMargin,
    backgroundColor: '#EEE',
    borderRadius: Metrics.borderRadius,
    padding: Metrics.smallMargin,
    alignItems: 'center'
  },
  contactItemIcon: {
    borderRadius: Metrics.borderRadius,
    marginRight: Metrics.smallMargin
  }
})
