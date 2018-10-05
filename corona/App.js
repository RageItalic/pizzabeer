import React, {Component} from 'react'
import {StatusBar} from 'react-native'
import {Container} from 'native-base'
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
      <Container>
        <StatusBar barStyle="dark-content" />
        <AppStackNavigator />
      </Container>
    )
  }
}
