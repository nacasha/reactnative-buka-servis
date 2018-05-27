import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'
import { App } from 'react-native-firebase';

export default StyleSheet.create({
  ...ApplicationStyles.listWithIcon,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  section: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 5,
    backgroundColor: '#EEE',
    borderTopWidth: 1,
    borderTopColor: '#CCC',
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
  accountSection: {
    padding: Metrics.baseMargin
  },
  accountUsername: {
    fontSize: Fonts.size.regular
  },
  accountImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  accountStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  accountStatusText: {
    marginLeft: 1,
    marginRight: 5
  },
  accountItemLeft: {
    ...ApplicationStyles.listWithIcon.itemLeft,
  },
  itemLeft: {
    ...ApplicationStyles.listWithIcon.itemLeft,
    width: 30
  },
})
