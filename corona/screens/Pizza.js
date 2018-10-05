import React, { PropTypes, Component } from 'react'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import { Container, Header, Title, Content, DeckSwiper, Card, CardItem, Thumbnail, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'
import EventList from '../components/EventList'
import { upcomingEventsNearYou } from '../helpers/filters'
import axios from 'axios'

export default class Pizza extends Component {
  
  static navigationOptions = {
  	title: 'Free Pizza Near You'
  }

  state = {
  	pizzaList: [],
  	loading: true
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (res) => {
      	const url = `https://api.meetup.com/find/upcoming_events?photo-host=public&page=300&sig_id=185976458&lon=+${res.coords.longitude}&lat=${res.coords.latitude}&sig=fc07d85773806ffd380510233af5574390228f2c`
		    axios.get(url)
		      .then(res => upcomingEventsNearYou(res, 'pizza'))
		      .then(eventList => {
		        return this.setState({
		          pizzaList: eventList,
		          loading: false
		        })
		      })
		      .catch(err => {
		        console.log('NETWORK ERROR', err)
		        Alert.alert("There has been an error. Please try again Later.")
		     		this.props.navigation.popToTop()
		     	})
      }
    )

    Alert.alert("Tap the Pizza Icon or the Event Title for information on the event! Tap the map for directions!")
  }
  
  render () {
  	if (this.state.loading === true) {
  		return (
  			<ActivityIndicator size="large" style={{marginTop: 30}}/>
  		)
  	}

    return (
      <Container>
      	<Content>
      		<EventList
      			events={this.state.pizzaList} 
      			svg={require('../svgs/Pizza.svg')}
      		/>
      	</Content>
      </Container>
    )
  }
}
