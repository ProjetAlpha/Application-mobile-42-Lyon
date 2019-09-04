/**
 * @format
 */
import React, { Component } from 'react';
import { AppRegistry } from "react-native";
import App from "./App.js";

import {name as appName} from './app.json';

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
