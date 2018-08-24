import React, {Component} from 'react'
import {createStackNavigator} from 'react-navigation'
import Home from './screens/Home'
import Pizza from './screens/Pizza'
import Beer from './screens/Beer'

const AppStackNavigator = createStackNavigator({
  Home,
  Pizza,
  Beer
})

export default class App extends Component {
  render() {
    return (
      <AppStackNavigator />
    )
  }
}
