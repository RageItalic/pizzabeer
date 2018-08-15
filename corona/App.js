import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native'
import { Container, Header, Title, Content, DeckSwiper, Card, CardItem, Thumbnail, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'
import {MapView} from 'expo'
import axios from 'axios'
import moment from 'moment'
import SvgUri from 'react-native-svg-uri'
import { upcomingEventsNearYou } from './helpers/filters'
import OptionHeader from './components/OptionHeader'
import EventList from './components/EventList'

export default class App extends React.Component {
  state = {
    lat: '',
    lon: '',
    view: 'mainMenu', // mainMenu, pizza, beer
    pizzaList: [],
    beerList: [],
    loading: false,
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (res) => this.setState({ lat: String(res.coords.latitude), lon: String(res.coords.longitude) })
    )
  }

  onOptionPress = (option) => {
    this.setState({ view: option, loading: true })

    const url = `https://api.meetup.com/find/upcoming_events?photo-host=public&page=300&sig_id=185976458&lon=+${this.state.lon}&lat=${this.state.lat}&sig=fc07d85773806ffd380510233af5574390228f2c`
    axios.get(url)
      .then(res => upcomingEventsNearYou(res, option))
      .then(eventList => {
        if (option === 'pizza') {
          return this.setState({
            pizzaList: eventList,
            loading: false
          })
        }

        return this.setState({
          beerList: eventList,
          loading: false
        })
      })
      .catch(err => {
        console.log('NETWORK ERROR', err) 
        Alert.alert("There has been an error. Please try again Later.")
      })
  }


  onBackPress = () => {
    this.setState({ view: 'mainMenu' })
  }

  render() {
    if (this.state.view === 'pizza') {
      console.log(this.state.pizzaList)
      return (
        <Container>
          <OptionHeader onBackPress={this.onBackPress} title="Pizza" />
          <Content>
            {this.state.loading 
              ? <ActivityIndicator 
                  size="large" 
                  style={{marginTop: 30}}
                /> 
              : <EventList 
                  events={this.state.pizzaList} 
                  svg={require('./svgs/Pizza.svg')} 
                />
            }
          </Content>
        </Container>
      )
    }

    if (this.state.view === 'beer') {
      return (
        <Container>
          <OptionHeader onBackPress={this.onBackPress} title="Beer" />
          <Content>
            {this.state.loading 
              ? <ActivityIndicator 
                  size="large" 
                  style={{marginTop: 30}}
                /> 
              : <EventList 
                  events={this.state.beerList} 
                  svg={require('./svgs/Beer.svg')} 
                />
            }
          </Content>
        </Container>
      )
    }

    return (
      <Container>
        <Container style={styles.pizza}>
          <TouchableOpacity onPress={() => this.onOptionPress('pizza')}>
            <SvgUri width="150" height="150" source={require('./svgs/Pizza.svg')} />
          </TouchableOpacity>
        </Container>
        <Container style={styles.beer}>
          <TouchableOpacity onPress={() => this.onOptionPress('beer')}>
            <SvgUri width="150" height="150" source={require('./svgs/Beer.svg')} />
          </TouchableOpacity>
        </Container>
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
  beer: {
    flex: 1,
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pizza: {
    flex: 1,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerText: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
