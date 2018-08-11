import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios'
import { upcomingEventsNearYou } from './helpers/filters'

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
      (res) => this.setState({ lat: String(res.coords.latitude), lon: String(res.coords.longitude) }),
      // errorCallback,
      // options
    )
  }


  onPizzaClick = async () => {
    this.setState({ view: 'pizza', loading: true })

    const url = 'https://api.meetup.com/find/upcoming_events?photo-host=public&page=300&sig_id=185976458&lon=+-79.3790878&lat=43.6509254&sig=fc07d85773806ffd380510233af5574390228f2c'
    axios.get(url)
      .then(res => upcomingEventsNearYou(res, 'pizza'))
      .then(pizzaList => {
        this.setState({
          pizzaList,
          loading: false
        })
      })
      .catch(err => console.log('NETWORK ERROR', err))
  }

  onBeerClick = () => {
    this.setState({ view: 'beer', loading: true })

    const url = 'https://api.meetup.com/find/upcoming_events?photo-host=public&page=300&sig_id=185976458&lon=+-79.3790878&lat=43.6509254&sig=fc07d85773806ffd380510233af5574390228f2c'
    axios.get(url)
      .then(res => upcomingEventsNearYou(res, 'beer'))
      .then(beerList => {
        this.setState({
          beerList,
          loading: false,
        })
      })
      .catch(err => console.log('NETWORK ERROR', err))
  }


  onBackClick = () => {
    this.setState({ view: 'mainMenu' })
  }

  render() {
    if (this.state.view === 'pizza') {
      return (
        <View style={styles.container}>
          <View style={styles.centerText}>
            <TouchableOpacity onPress={() => this.onBackClick()} style={{ marginTop: 30 }}>
              <Text>
                {'< Back'}
              </Text>
            </TouchableOpacity>
            {this.state.loading ? <ActivityIndicator size="large"/> : <ScrollView>
              <Text style={styles.centerText}>
                Upcoming Events with Pizza Near You
              </Text>
              {this.state.pizzaList.map(pizzaEvent => {
                return (
                <View  style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'black'
                }} key={pizzaEvent.id}>
                  <Text key={pizzaEvent.id}>
                    {pizzaEvent.name}
                  </Text>
                </View>
                )
              })}
            </ScrollView>}
          </View>
        </View>
      )
    }
    if (this.state.view === 'beer') {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.onBackClick()} style={{ marginTop: 30 }}>
            <Text>
              {'< Back'}
            </Text>
          </TouchableOpacity>
          {this.state.loading ? <ActivityIndicator size="large"/> : <ScrollView>
            <Text style={styles.centerText}>
              Upcoming Events with Free Beer Near You
            </Text>
            {this.state.beerList.map(beerEvent => {
              return (
                <View  style={{
                  borderBottomWidth: 1,
                  borderBottomColor: 'black'
                }} key={beerEvent.id}>
                <Text>
                  {beerEvent.name}
                </Text>
                </View>
              )
            })}
          </ScrollView>}
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <View style={styles.pizza}>
          <TouchableOpacity onPress={() => this.onPizzaClick()}>
            <Text style={styles.icon}>
              🍕
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.beer}>
          <TouchableOpacity onPress={() => this.onBeerClick()}>
            <Text style={styles.icon}>
              🍺
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    borderTopWidth: 1,
    borderTopColor: 'black',
    backgroundColor: 'orange',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pizza: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 100,
  },
  centerText: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
