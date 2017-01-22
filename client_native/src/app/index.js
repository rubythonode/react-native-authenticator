import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
//import reduxThunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';
/*
import { AUTH_USER } from './actions/types';
import { SET_ADMIN_PRIVILEGES } from './actions/types';

import routes from './routes';
*/
import { Scene, Router, Actions } from 'react-native-router-flux';

import reducers from './redux/rootReducer';
import Login from '../scenes/login/login';
import Home from '../scenes/home/home';

const createStoreWithMiddlware = applyMiddleware()(createStore);
const store = createStoreWithMiddlware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class client_native extends Component {
  
  async componentWillMount() {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      Actions.home();
    }
  }

  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Scene key="login" 
                 title="Login" 
                 initial
                 type="reset"
                 component={ Login } />
          <Scene key="home"
                 title="Home"
                 type="reset"
                 component={ Home } />
        </Router>
        
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
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

AppRegistry.registerComponent('client_native', () => client_native);