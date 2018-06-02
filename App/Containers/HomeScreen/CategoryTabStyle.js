import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.listWithIcon,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  section: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: Colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: Colors.transparent,
  },
  sectionTitle: {
    color: Colors.darkBlue,
    fontWeight: 'bold',
  },
  sectionFooter: {
    padding: Metrics.smallMargin
  },
  itemLeft: {
    ...ApplicationStyles.listWithIcon.itemLeft,
    width: 30
  },
})
