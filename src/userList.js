import React, { Component } from 'react';
import { Container, Content, Header, Spinner, List, ListItem, Left, Thumbnail, Body, Text, Right, Button} from 'native-base';
import AsyncStorage from 'react-native';
import GetApiData from './get_api_data.js'

class Item extends Component{
  render(){
    return (
      <Content>
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: this.props.uri }} />
          </Left>
          <Body>
            <Text numberOfLines={1}>{this.props.name}</Text>
          </Body>
          <Right>
            <Button transparent>
              <Text>Profil</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    </Content>
   );
  }
}

export default class UserList extends Component {

  constructor(props){
    super(props)
    this.apiDataManager = new GetApiData();
    this.state = {items:'', isLoading:false}
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
          this.setState({items:data, isLoading:true})
        }catch (e){
          console.log(e)
        }
      }else {
        const value = await AsyncStorage.getItem('@42apidata')
        this.setState({items:JSON.parse(value), isLoading:true})
      }
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount(){
    this.checkData()
  }

  render() {
    const {items, isLoading} = this.state
    if (!isLoading || !items){
        return (
          <Container>
            <Header />
            <Content>
              <Spinner />
            </Content>
          </Container>
        )
    }else
    {
        return (
          items.map((item) => <Item uri={item.link} name={item.name} />)
      )
    }
  }
}
