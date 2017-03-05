import React, { Component } from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { processForm } from './login.action';

import { View, Text, Button, TextInput, AsyncStorage, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

import { LoginButton, AccessToken } from 'react-native-fbsdk';

import { emailValidator } from '../../app/common/validations';

import { processSignupForm } from '../signup/signup.action';

const Form = t.form.Form;

let Email = t.refinement(t.String, emailValidator);
Email.getValidationErrorMessage = function (value, path, context) {
  return 'Invalid email address';
};
const formModel = t.struct({
  email: Email,
  password: t.String
});

let options = {
  fields: {
    password: {
      error: 'Password is required',
      password: true,
      secureTextEntry: true
    }
  }
};

export class Login extends Component {

	constructor() {
	    super();
			this.handleFormSubmit = this.handleFormSubmit.bind(this);
	};

	handleFormSubmit() {
    let value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      this.props.processForm(value);
    }
	};


	render() {
		return (
			<ScrollView keyboardShouldPersistTaps={'handled'}>
				<View style={styles.container}>
            <Form
            ref="form"
            type={formModel}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.handleFormSubmit} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
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
												AccessToken.getCurrentAccessToken()
																	 .then((data) => {
																		 const { accessToken } = data;
																		 fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
																		  .then((response) => response.json())
																		  .then((json) => {
                                        let user = {
                                          name: json.name,
                                          email: json.email,
                                          password: 'password',
                                          social: {
                                            facebook: {
                                              token: accessToken
                                            }
                                          }
                                        }
                                        this.props.processSignupForm(user);
																		  })
																		  .catch((error) => {
																		    console.log(error)
																		  })
																	 });
                      }
                    }
                  }
                  onLogoutFinished={() => alert("User logged out")}/>
          <Text onPress={Actions.signup}>Dont have an account?</Text>

				</View>
        </ScrollView>
		);
	};
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    processForm: processForm,
    processSignupForm: processSignupForm
	}, dispatch);
};

function mapStateToProps(state) {
	return {
		errors: state.login.errors
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
	inputStyle:{
		height: 20,
		borderColor: 'gray',
		borderWidth: 1
	},
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
})
