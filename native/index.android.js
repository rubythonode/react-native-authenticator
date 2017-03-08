/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/*
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class new_native extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <View>
           <LoginButton
             publishPermissions={["publish_actions"]}
             onLoginFinished={
               (error, result) => {
                 if (error) {
                   alert("login has error: " + result.error);
                 } else if (result.isCancelled) {
                   alert("login is cancelled.");
                 } else {
                   AccessToken.getCurrentAccessToken().then(
                     (data) => {
                       alert(data.accessToken.toString())
                     }
                   )
                 }
               }
             }
             onLogoutFinished={() => alert("logout.")}/>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('new_native', () => new_native);
*/

import { AppRegistry } from 'react-native';
import wishfill_native from './src/app/index';

AppRegistry.registerComponent('new_native', () => wishfill_native);