import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base'

export default function OptionHeader ({title, onBackPress}) {
  return (
    <Header>
      <Left>
        <Button hasText transparent onPress={() => onBackPress()}>
          <Text style={{color: 'blue'}}>{'< Back'}</Text>
        </Button>
      </Left>
      <Body>
        <Title>Free {title}</Title>
      </Body>
      <Right>
      </Right>
    </Header>
  )
}
