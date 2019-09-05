import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

export default class SearchBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      query: ""
    };
  }

  handleInputChange(event){
    const query = event.nativeEvent.text
    this.setState({query:query})
    if (query == '')
      return (this.props.cancelSearch())
    this.props.updateList(query)
  }

  render() {
    return (
        <Header searchBar rounded style={{backgroundColor:"#6a51ae"}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" value={this.state.query}
            onChange={this.handleInputChange.bind(this)}/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
    );
  }
}
