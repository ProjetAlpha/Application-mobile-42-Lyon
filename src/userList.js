import React, { Component } from 'react';
import { Container, Content, Header, Spinner, List, ListItem, Left, Thumbnail, Body, Text, Right, Button} from 'native-base';
import  { Linking, ScrollView } from 'react-native';
import { AsyncStorage } from '@react-native-community/async-storage'
import GetApiData from './get_api_data.js'
import SearchBar from './search.js'

class Item extends Component{
  render(){
    return (
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: this.props.uri }} />
          </Left>
          <Body>
            <Text>{this.props.name}</Text>
            <Text note numberOfLines={1}>{this.props.host}</Text>
          </Body>
          <Right>
            <Button transparent>
            <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL(this.props.profil)}>
            Profil
            </Text>
            </Button>
          </Right>
        </ListItem>
   );
  }
}

export default class UserList extends Component {

  constructor(props){
    super(props)
    this.apiDataManager = new GetApiData();
    this.state = {items:'', filerData:'', isLoading:false}
  }

  async updateItems(cache){
    let data = null
    if (cache.needUpdate)
      data = await cache.updatedData()
    if (data === null && !this.state.items){
      data = await cache.getData()
      if (data === null)
        data = await cache.updatedData()
    }
    if (data !== null)
      this.setState({items:data, isLoading:true})
  }

  searchListUpdate(needle){
    const query = needle.toLowerCase()
    this.setState(prevState => (
      {
        items:prevState.items,
        filterData: prevState.items.filter(item => item.name.toLowerCase().indexOf(query) >= 0),
        isLoading:true
      })
    )
  }

  cancelSearchUpdate(){
    this.setState(prevState => ({items:prevState.items, filterData:'', isLoading:true}))
  }

  render() {
    // OPTIMIZED: charger 10 profils max pour le filtre et les items.
    const {items, filterData, isLoading} = this.state
    const listData = filterData ? filterData : items
    const cache = this.props.navigation.getParam('cache', 'NO-CACHE')
    if (cache !== 'NO-CACHE'){
      this.updateItems(cache)
    }
    if (!isLoading){
        return (
          <Container>
            <Header style={{backgroundColor:"#6a51ae"}}/>
            <Content>
              <Spinner />
            </Content>
          </Container>
        )
    }else
    {
        return (
          <Container>
            <SearchBar updateList={this.searchListUpdate.bind(this)} cancelSearch={this.cancelSearchUpdate.bind(this)}/>
          <ScrollView>
          <Content>
          <List>
          {
            listData.map(
              (item, index) =>
              <Item uri={item.link} name={item.name} profil={item.profil} host={item.host} key={index}/>
            )
          }
          </List>
          </Content>
          </ScrollView>
        </Container>
      )
    }
  }
}
