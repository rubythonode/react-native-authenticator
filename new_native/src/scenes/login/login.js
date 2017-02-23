import React, { Component } from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { processForm } from './login.action';

import { View, Text, Button, TextInput, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { LoginButton } from 'react-native-fbsdk';

export class Login extends Component {

	constructor() {
	    super();
	    this.state = {
	    	email: '',
	    	password: ''
	    };
			this.handleFormSubmit = this.handleFormSubmit.bind(this);
	};

	handleFormSubmit() {
		this.props.processForm(this.state.email, this.state.password);
	};

	render() {
		return (
			<View style={{ flex: 1, marginTop: 70 }}>
					<View>
						<Text>Email:</Text>
						<TextInput onChangeText={(email) => this.setState({email})}
        						   value={this.state.email}
								   style={{
										height: 20,
										borderColor: 'gray',
										borderWidth: 1 }}  />
					</View>
					<TextInput onChangeText={(password) => this.setState({password})}
        					   value={this.state.password}
							   style={{
									height: 20,
									borderColor: 'gray',
									borderWidth: 1 }} />

					<Button title="Login"
							onPress={this.handleFormSubmit} />
					<LoginButton
				          publishPermissions={["publish_actions"]}
				          onLoginFinished={
				            (error, result) => {
				              if (error) {
				                alert("Login failed with error: " + result.error);
				              } else if (result.isCancelled) {
				                alert("Login was cancelled");
				              } else {
				                alert("Login was successful with permissions: " + result.grantedPermissions)
				              }
				            }
				          }
				          onLogoutFinished={() => alert("User logged out")}/>
					<Text>Dont have an account?</Text>

			</View>
		);
	};
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    processForm: processForm
	}, dispatch);
};

function mapStateToProps(state) {
	return {
		errors: state.login.errors
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
