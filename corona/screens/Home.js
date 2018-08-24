import React, { PropTypes, Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native'
import { Container, Header, Title, Content, Button, Icon } from 'native-base'
import axios from 'axios'
import moment from 'moment'
import SvgUri from 'react-native-svg-uri'
import { upcomingEventsNearYou } from '../helpers/filters'
import EventList from '../components/EventList'
import { Font, AppLoading } from 'expo'

export default class Home extends Component {
	
	static navigationOptions = {
		header: null
	}

  state = {
    loading: true, //load fonts before app is used.
  }

  componentWillMount() {
    //https://github.com/GeekyAnts/NativeBase/issues/1466
    Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    }).then(() => this.setState({ loading: false }))
  }

  render() {
    if (this.state.view === 'mainMenu' && this.state.loading === true) {
      return <AppLoading />
    }

    return (
      <Container>
        <View style={styles.option}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Pizza')}>
            <SvgUri width="170" height="170" source={require('../svgs/Pizza.svg')} />
          </TouchableOpacity>
        </View>
        <View style={styles.option}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Beer')}>
            <SvgUri width="170" height="170" source={require('../svgs/Beer.svg')} />
          </TouchableOpacity>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    flex: 1,
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
