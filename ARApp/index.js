import { AppRegistry } from 'react-native';
import App from './App.js';

// window.console.log = texts => console.warn(texts);

AppRegistry.registerComponent('ARApp', () => App);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => App);