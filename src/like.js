 import React, { Component } from 'react';
 import { Linking, Image, AsyncStorage } from 'react-native';
 import { Container, Content, Button, Spinner, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
 import GetApiData from './get_api_data.js'

export default class Like extends Component {

  constructor(props){
    super(props)
    this.state = {cards:'', isLoading:false}
    this.apiDataManager = new GetApiData();
  }

  async updateCards(cache){
    let data = null
    if (cache.needUpdate)
      data = await cache.updatedData()
    if (data === null && !this.state.cards){
      data = await cache.getData()
      if (data === null)
        data = await cache.updatedData()
    }
    if (data !== null)
      this.setState({cards:data, isLoading:true})
  }

  render() {
    const {cards, isLoading} = this.state
    const cache = this.props.navigation.getParam('cache', 'NO-CACHE')
    if (cache !== 'NO-CACHE'){
      this.updateCards(cache)
    }
    if (!isLoading){
    return (
    <Container>
      <Header />
      <Content>
        <Spinner />
      </Content>
    </Container>
  );
}
    else{
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
                      onPress={() => Linking.openURL(item.profil)}>
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
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-evenly', alignItems: 'center', padding: 12 }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="trash" />
            <Text>UGLY</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="heart" />
            <Text>BG</Text>
          </Button>
        </View>
      </Container>
    );
   }
  }
}
