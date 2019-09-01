 import React, { Component } from 'react';
 import AsyncStorage from '@react-native-community/async-storage';
 import { Linking, Image } from 'react-native';
 import { Container, Content, Button, Spinner, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
 import GetApiData from './get_api_data.js'

export default class Like extends Component {

  constructor(props){
    super(props)
    this.state = {cards:'', isLoading:false}
    this.apiDataManager = new GetApiData();
  }

  async checkData(){
    try {
      const data = await AsyncStorage.multiGet(['@42apidata', '@refreshTiming'])
      const startTime = data[1][1]
      const value = data[0][1]
      const endTime = new Date();
      const elapsedTime = (endTime - startTime) / 1000
      if (value === null || (value !== null && elapsedTime > 300)) {
        const data = await this.apiDataManager.getAuthToken('__ID__',
        '__PASS__')
        try{
          //await AsyncStorage.multiSet([['@42apidata', JSON.stringify(data)], ['@refreshTiming', new Date()]])
          this.setState({cards:data, isLoading:true})
        }catch (e){
          console.log(e)
        }
      }else {
        const value = await AsyncStorage.getItem('@42apidata')
        this.setState({cards:value, isLoading:true})
      }
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.checkData()
  }

  render() {
    const {cards, isLoading} = this.state
    if (!isLoading)
    return (
    <Container>
      <Header />
      <Content>
        <Spinner />
      </Content>
    </Container>
  );
    else
    return (
      <Container>
        <Header />
        <View>
          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={cards}
            renderEmpty={() =>
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>
            }
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri : item.link}} />
                    <Body>
                      <Text>{item.host ? item.host : 'no host'}</Text>
                      <Text style={{color: 'blue'}}
                      onPress={() => this.openUrl(item.profil)}>
                      Profil
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={{uri : item.link}} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Swipe Left</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="arrow-forward" />
            <Text>Swipe Right</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
