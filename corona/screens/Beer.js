import React, { PropTypes, Component } from 'react'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import { Container, Header, Title, Content, DeckSwiper, Card, CardItem, Thumbnail, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'
import EventList from '../components/EventList'
import { upcomingEventsNearYou } from '../helpers/filters'
import axios from 'axios'

export default class Beer extends Component {
  
  static navigationOptions = {
  	title: 'Free Beer Near You'
  }

  state = {
  	beerList: [],
  	loading: true
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (res) => {
      	const url = `https://api.meetup.com/find/upcoming_events?photo-host=public&page=300&sig_id=185976458&lon=+${res.coords.longitude}&lat=${res.coords.latitude}&sig=fc07d85773806ffd380510233af5574390228f2c`
		    axios.get(url)
		      .then(res => upcomingEventsNearYou(res, 'beer'))
		      .then(eventList => {
		        return this.setState({
		          beerList: eventList,
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
      			events={this.state.beerList} 
      			svg={require('../svgs/Beer.svg')}
      		/>
      	</Content>
      </Container>
    )
  }
}
