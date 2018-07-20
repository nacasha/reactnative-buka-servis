import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: 'red'
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: Metrics.baseMargin,
    },
    scrollContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      },
    sectionHeader: {
      paddingHorizontal: Metrics.baseMargin,
      paddingTop: Metrics.baseMargin,
      flexDirection: 'row',
      alignItems: 'center'
    },
    sectionIcon: {
      marginRight: 5,
      fontSize: Fonts.size.regular
    },
    sectionLabel: {
      ...Fonts.style.normal,
    },
    sectionText: {
      marginBottom: Metrics.smallMargin,
    },
    emptySection: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: Metrics.baseMargin
    },
    emptySectionText: {
      fontSize: Fonts.size.regular
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    },
    footer: {
      backgroundColor: '#ECEEF5',
      height: 70,
      paddingHorizontal: 5,
      paddingVertical: Metrics.smallMargin,
      borderTopWidth: 1,
      borderTopColor: '#DDD',
      elevation: 2,
      flexDirection: 'row'
    },
    footerItem: {
      flex: 1,
      marginHorizontal: Metrics.smallMargin
    },
    textButton: {
      color: Colors.facebook,
      fontWeight: 'bold',
      padding: Metrics.smallMargin,
    },
    headerIcon: {
      paddingHorizontal: Metrics.baseMargin
    }
  },
  listWithIcon: {
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: 0
    },
    item: {
      flexDirection: 'row',
      paddingLeft: Metrics.smallMargin
    },
    itemLeft: {
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: Metrics.smallMargin,
    },
    itemRight: {
      flex: 1,
      paddingVertical: Metrics.baseMargin
    },
    itemSeparator: {
      borderBottomWidth: 1.5,
      borderBottomColor: '#DDD',
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
