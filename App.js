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
            <Button
              vertical
              active={props.navigation.state.routeName == "UserList"}
              onPress={() => props.navigation.navigate("UserList")}>
              <Icon name="list" />
              <Text>List</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.routeName == "Like"}
              onPress={() => props.navigation.navigate("Like")}>
              <Icon name="favorite" />
              <Text>Like</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

const AppContainer = createAppContainer(MainScreenNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
