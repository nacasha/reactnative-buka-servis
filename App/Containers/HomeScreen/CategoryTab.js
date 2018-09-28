import React from 'react'
import { View, Text, SectionList, Image, TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CATEGORIES from '../../Fixtures/categories.json'
import styles from './CategoryTabStyle'

class CategoryTab extends React.PureComponent {
  onPress = (category, specialist) => () => {
    if (this.props.onChange) {
      this.props.onChange(category, specialist)
    }
  }

  renderItem = ({ section, item }) => {
    return (
      <TouchableNativeFeedback onPress={this.onPress(section.key, item.key)}>
        <View style={styles.item}>
          <View style={styles.itemLeft} pointerEvents="none">
            <Icon name={item.icon} size={22} />
          </View>
          <View style={styles.itemRight} pointerEvents="none">
            <Text style={styles.username}>{item.title}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderSectionHeader({ section }) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
    )
  }

  renderSectionFooter = () =>
    <View style={styles.sectionFooter} />

  renderItemSeparator = () =>
    <View style={[styles.itemSeparator, { marginLeft: 50 }]} />

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          sections={CATEGORIES}
          contentContainerStyle={styles.listContent}
          renderItem={this.renderItem}
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTab)
