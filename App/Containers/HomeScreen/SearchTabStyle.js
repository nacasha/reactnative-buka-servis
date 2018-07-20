import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
  }
})
