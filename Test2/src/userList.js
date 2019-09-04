import React, { Component } from 'react';
import { Container, Content, Header, Spinner, List, ListItem, Left, Thumbnail, Body, Text, Right, Button} from 'native-base';
import  { Linking, AsyncStorage, ScrollView } from 'react-native';
import GetApiData from './get_api_data.js'

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
    this.state = {items:'', isLoading:false}
  }

  async checkList(){
      const data = await AsyncStorage.multiGet(['api_data', 'refresh_timing'])
      const startTime = data[1][1]
      const value = data[0][1]
      const endTime = new Date();
      const elapsedTime = (endTime - startTime) / 1000
      if (value === null || (value !== null && elapsedTime > 300)) {
        const items = await this.apiDataManager.getAuthToken('ID',
        'PASS')
          await AsyncStorage.multiSet([['api_data', JSON.stringify(items)],
          ['refresh_timing', JSON.stringify({time:new Date()})]])
          this.setState({items:items, isLoading:true})
      }else {
        const value = await AsyncStorage.getItem('api_data')
        this.setState({items:JSON.parse(value), isLoading:true})
      }
  }

  componentDidMount(){
    this.checkList()
  }

  render() {
    const {items, isLoading} = this.state
    if (!isLoading || !Array.isArray(items)){
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
          <ScrollView>
          <Content>
          <List>
          {items.map((item, index) => <Item uri={item.link} name={item.name} profil={item.profil} host={item.host} key={index}/>)}
          </List>
          </Content>
          </ScrollView>
      )
    }
  }
}
