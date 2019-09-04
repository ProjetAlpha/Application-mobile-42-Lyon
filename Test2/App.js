import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
import { AppRegistry } from "react-native";
import UserList from "./src/userList.js";
import Like from "./src/like.js";

const MainScreenNavigator = createBottomTabNavigator(
  {
    UserList: { screen: UserList },
    Like: { screen: Like }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button style={{color: props.navigation.state.routeName == "UserList" ? props.activeTintColor : props.inactiveTintColor}}
              vertical
              active={props.navigation.state == "UserList"}
              onPress={() => props.navigation.navigate("UserList", {needRefresh:true})}>
              <Icon name="list" />
              <Text>List</Text>
            </Button>
            <Button style={{color: props.navigation.state.routeName == "Like" ? props.activeTintColor : props.inactiveTintColor}}
              vertical
              active={props.navigation.state == "Like"}
              onPress={() => props.navigation.navigate("Like", {needRefresh:true})}>
              <Icon name="heart" />
              <Text>Like</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    },
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(MainScreenNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
