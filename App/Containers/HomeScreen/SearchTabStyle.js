import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollContainer: {
    backgroundColor: '#ECEEF5',
  },
  container: {
    ...ApplicationStyles.screen.container,
    backgroundColor: '#ECEEF5',
    overflow: 'visible',
  },
  rangeText: {
    fontSize: 12
  },
  section: {
    marginBottom: 18
  },
  sectionLabel: {
    color: '#9697B6',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchingModal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchingText: {
    color: '#FFF',
    fontSize: 19,
    marginTop: Metrics.baseMargin
  },
  cancelSearchText: {
    fontSize: 16,
    color: '#DDD',
    marginTop: Metrics.doubleBaseMargin
  }
})
