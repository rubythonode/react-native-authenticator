import React, { Component } from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signInAction, setAdminPrevilegeAction, signInErrorAction } from './login.action';

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
	    this.processForm = this.processForm.bind(this);
	};

	processForm() {
		axios('http://localhost:3000/auth/login', {
			method: 'POST',
			data: {
				email: this.state.email,
	            password: this.state.password
	        }
		}).then((response) => {
		    if (response.status == 200) {
		        // success
				this.props.signIn();
				this.props.adminPrevilege();

		        AsyncStorage
		          .setItem('token', response.data.token)
		          .then(() => {
		          	AsyncStorage
		          	  .getItem('token')
		          	  .then((token) => {
		          	     console.log('token', token);
		          	  });
		          });

		       	AsyncStorage.setItem('user', JSON.stringify(response.data.userData));

		      	Actions.home();

		    }
		}).catch((errors) => {
        	// change the component state
        	this.props.setErrors(errors);
		});
	}

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
							onPress={this.processForm} />
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
    signIn: signInAction,
    adminPrevilege: setAdminPrevilegeAction,
    setErrors: signInErrorAction
  }, dispatch);
};

function mapStateToProps(state) {
	return {
		errors: state.login.errors
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
