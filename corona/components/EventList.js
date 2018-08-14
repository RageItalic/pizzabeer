import React from 'react'
import { View, StyleSheet, Text, Linking, Alert } from 'react-native'
import { Container, Header, Title, Content, DeckSwiper, Card, CardItem, Thumbnail, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'
import {MapView, Constants} from 'expo'
import moment from 'moment'
import SvgUri from 'react-native-svg-uri'

export default function EventList ({events, svg}) {
	console.log("?????????????????????????????????", Linking)
  return (
    <View>
      {events.map(item => {
        return (
          <Card style={{elevation: 3}} key={item.id}>
            <CardItem>
              <Left>
                <SvgUri width="50" height="50" source={svg} />
                <Body>
                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                  <Text note>On {moment(item.local_date).format("MMM Do YYYY")}, at {item.local_time}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <MapView 
                scrollEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                style={styles.map}
                initialRegion={{
                  ...item.coordinates, 
                  latitudeDelta: 0.08, 
                  longitudeDelta: 0.04
                }}
              >
                <MapView.Marker coordinate={item.coordinates} />
              </MapView>
            </CardItem>
            <CardItem>
              <Text>Interested in this event? Find more info</Text><Text onPress={() => Linking.openURL(item.link).catch(err => Alert.alert("There has been an unexpected error. Please try again later."))} style={{color: 'blue'}}> here!</Text>
            </CardItem>
          </Card>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
	map: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  }
})