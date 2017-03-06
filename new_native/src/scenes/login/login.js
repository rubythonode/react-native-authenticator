import React, { Component } from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Button, TextInput, AsyncStorage, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';
import { Actions } from 'react-native-router-flux';

// Custom modules
import { emailValidator } from '../../app/common/validations';
import { processSignupForm } from '../signup/signup.action';
import { processForm, facebookLogin } from './login.action';
import { Styles } from '../../app/common/styles';


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
				<View style={Styles.container}>
            <Form
            ref="form"
            type={formModel}
            options={options}
          />
          <TouchableHighlight style={Styles.button} onPress={this.handleFormSubmit} underlayColor='#99d9f4'>
            <Text style={Styles.buttonText}>Login</Text>
          </TouchableHighlight>
            <Button title="Login with facebook" onPress={this.props.facebookLogin} />
          <Text onPress={Actions.signup}>Dont have an account?</Text>

				</View>
        </ScrollView>
		);
	};
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    processForm: processForm,
    processSignupForm: processSignupForm,
    facebookLogin: facebookLogin
	}, dispatch);
};

function mapStateToProps(state) {
	return {
		errors: state.login.errors
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
