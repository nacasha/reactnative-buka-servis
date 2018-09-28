import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { Root } from "native-base"

const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Root>
          <RootContainer />
        </Root>
      </Provider>
    )
  }
}

export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
