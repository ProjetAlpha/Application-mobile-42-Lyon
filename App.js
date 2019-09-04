import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
import { AppRegistry } from "react-native";
import UserList from "./src/userList.js";
import Like from "./src/like.js";
import Cache from "./src/cache.js";

const cacheObj = new Cache();
const MainScreenNavigator = createBottomTabNavigator(
  {
    UserList: { screen: UserList },
    Like: { screen: Like }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      const state = props.navigation.state
      const routes = state.routes
      const routeIndex = state.index
      const likeBtnColor = routes[routeIndex].routeName == "Like" ? props.activeTintColor : props.inactiveTintColor
      const listBtnColor = routes[routeIndex].routeName == "UserList" ? props.activeTintColor : props.inactiveTintColor
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={routes[routeIndex].routeName == "UserList"}
              onPress={() => props.navigation.navigate("UserList", {cache:cacheObj})}>
              <Icon name="list" />
              <Text>List</Text>
            </Button>
            <Button
              vertical
              active={routes[routeIndex].routeName == "Like"}
              onPress={() => props.navigation.navigate("Like", {cache:cacheObj})}>
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
    initialRouteName : 'UserList',
    initialRouteParams: {cache:cacheObj}
  }
);

const AppContainer = createAppContainer(MainScreenNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
