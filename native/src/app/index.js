import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import jwt_decode from 'jwt-decode';

import { Scene, Router, Actions } from 'react-native-router-flux';
import createLoggerMiddleware from 'redux-logger';

import reducers from './redux/rootReducer';
import Login from '../scenes/login/login';
import Home from '../scenes/home/home';
import Signup from '../scenes/signup/signup';
import './common/http-interceptor';
import { processFormCallback } from  './common/helper';

let middlewares = [];
if (__DEV__ === true) {
  middlewares.push(createLoggerMiddleware({}));
}
middlewares.push(reduxThunk);

const createStoreWithMiddlware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddlware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class native extends Component {

  async componentWillMount() {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      const storedUser = await AsyncStorage.getItem('user');
      const payload = JSON.parse(storedUser);
      store.dispatch({
        type: 'LOGIN_SUCCESS',
        payload
      })
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
          <Scene key="signup"
                title="Signup"
                type="reset"
                component={ Signup }/>
        </Router>

      </Provider>
    );
  }
};

AppRegistry.registerComponent('native', () => native);
