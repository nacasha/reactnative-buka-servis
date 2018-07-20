import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#ECEEF5',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin
  },
  sectionIcon: {
    marginRight: 5
  },
  sectionLabel: {
    fontSize: Fonts.size.medium
  },
  sectionFooter: {
    margin: Metrics.smallMargin
  },
  item: {
    marginHorizontal: Metrics.smallMargin
  },
  itemSeparator: {
    padding: 5
  },
  listContent: {
    paddingVertical: Metrics.smallMargin
  }
})
