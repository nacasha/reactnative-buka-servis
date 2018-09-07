import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import HelpItem from '../Components/HelpItem'
import I18n from '../I18n'

import styles from './Styles/HelpScreenStyle'

class HelpScreen extends React.PureComponent {
  state = {
    dataObjects: [
      { title: I18n.t('helpTitle_App'), content: I18n.t('helpContent_App') },
      { title: I18n.t('helpTitle_Chat'), content: I18n.t('helpContent_Chat') },
      { title: I18n.t('helpTitle_Store'), content: I18n.t('helpContent_Store')},
    ]
  }

  renderRow ({item}) {
    return (
      <HelpItem title={item.title} content={item.content} />
    )
  }

  keyExtractor = (item, index) => item.title

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)
