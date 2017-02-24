import React, { Component } from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { View, Text, Button, TextInput, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Import action creator
import { processSignupForm } from './signup.action';

class Signup extends Component{

  constructor() {
    super();

    // set the initial component state
    this.state = {
      errorMessage: '',
      errors: {},
      authenticated: false,
      admin_privileges: false,
      name: '',
      email: '',
      password: ''
    };
    this.handleSignupFormSubmit = this.handleSignupFormSubmit.bind(this);
  }

  handleSignupFormSubmit(){
    this.props.processSignupForm(this.state.name, this.state.email, this.state.password);
  }
  render(){
    return(
      <View style={{ flex: 1, marginTop: 70 }}>
        <View>
            <Text>Name:</Text>
            <TextInput onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            style={{
              height: 20,
              borderColor: 'gray',
              borderWidth: 1 }}  />
              </View>
          <View>
          <View>
            <Text>Email:</Text>
            <TextInput onChangeText={(email) => this.setState({email})}
                       value={this.state.email}
                   style={{
                    height: 20,
                    borderColor: 'gray',
                    borderWidth: 1 }}  />
          </View>
            <Text>Password:</Text>
            <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({password})}
                       value={this.state.password}
                   style={{
                    height: 20,
                    borderColor: 'gray',
                    borderWidth: 1 }}  />
          </View>
          <Button title="Sign up"
							onPress={this.handleSignupFormSubmit} />
          <Text onPress={Actions.login}>
            Go to login
          </Text>
      </View>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    processSignupForm: processSignupForm
	}, dispatch);
};

function mapStateToProps(state) {
	return {
		errors: state.login.errors
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
