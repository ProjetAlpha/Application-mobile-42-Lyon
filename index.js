/**
 * @format
 */
 import React, { Component } from 'react';
 import { Image,Linking } from 'react-native';
 import { Container, Content, Spinner,
   Header, Button, View, DeckSwiper, Card, CardItem, List, ListItem,
   Thumbnail, Text, Left, Right, Body, Icon} from 'native-base';
import { TabNavigator } from "react-navigation";
import { AppRegistry } from "react-native";
import App from "./App.js";

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
