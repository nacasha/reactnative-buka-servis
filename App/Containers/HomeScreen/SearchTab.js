import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import SearchActions from '../../Redux/SearchRedux'
import { Picker, Form, Item, Label } from 'native-base'
import RoundedButton from '../../Components/RoundedButton';

// Styles
import styles from './SearchTabStyle'

class SearchTab extends Component {
  constructor(props) {
    super(props)

    this.onPressSearchNearby = this.onPressSearchNearby.bind(this)
  }

  onPressSearchNearby() {
    this.props.navigation.navigate({
      key: 'SearchNearbyScreen',
      routeName: 'SearchNearbyScreen'
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Item style={{ borderBottomWidth: 0, marginBottom: 10 }}>
          <Label>Radius</Label>
          <Picker
            mode="dialog"
            selectedValue={this.props.radius}
            onValueChange={value => this.props.changeRadius(value)}
          >
            <Picker.Item label="200 meter" value={0.2} />
            <Picker.Item label="500 meter" value={0.5} />
            <Picker.Item label="1 Kilometers" value={1} />
            <Picker.Item label="1.5 Kilometers" value={1.5} />
            <Picker.Item label="2 Kilometers" value={2} />
            <Picker.Item label="3 Kilometers" value={3} />
          </Picker>
        </Item>

        <RoundedButton
          text="Search Nearby"
          onPress={this.onPressSearchNearby}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    radius: state.search.radius
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeRadius: (r) => dispatch(SearchActions.changeRadius(r)),
    nearby: () => dispatch(SearchActions.nearby())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTab)
