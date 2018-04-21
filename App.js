import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//TensorFlow
import * as tf from '@tensorflow/tfjs';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './containers/HomeScreen';
import ImageScreen from './containers/ImageScreen';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Image: {
      screen: ImageScreen,
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#E34B2A',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#291425',
        flex: 1,
        textAlign: "center",
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
