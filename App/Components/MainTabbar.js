import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/MainTabbarStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class MainTabbar extends Component {
  icons = []

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this))
  }

  setAnimationValue({ value, }) {
    this.icons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      })
    })
  }

  iconColor(progress) {
    const red = 86 + (204 - 86) * progress
    const green = 149 + (204 - 149) * progress
    const blue = 255 + (204 - 255) * progress
    return `rgb(${red}, ${green}, ${blue})`
  }

  renderTabs = () => this.props.tabs.map((tab, i) =>
    <TouchableOpacity activeOpacity={0.3} key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
      <Icon
        name={this.props.data[tab].icon}
        size={20}
        color={this.props.activeTab === i ? 'rgb(86, 149, 255)' : 'rgb(204,204,204)'}
        ref={(icon) => { this.icons[i] = icon }}
      />
      <Text style={styles.tabLabel}>{this.props.data[tab].label}</Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.renderTabs()}
      </View>
    )
  }
}
