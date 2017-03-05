import React, { Component } from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { View, Text, Button, TextInput, AsyncStorage, StyleSheet, ScrollView , TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Import action creator
import { processSignupForm } from './signup.action';

import t from 'tcomb-form-native';
import { emailValidator, passwordValidator } from '../../app/common/validations';

let Email = t.refinement(t.String, emailValidator);
Email.getValidationErrorMessage = function (value, path, context) {
  return 'Your email must be valid.';
};
let Password = t.refinement(t.String, passwordValidator);
Password.getValidationErrorMessage = function(value, path, context){
  return 'Your password must be at least 8 characters.';
}

const Form = t.form.Form;
const formModel = t.struct({
  name: t.String,
  email: Email,
  password: Password
});
let options = {
  fields: {
    email: {
      error: 'Your email must be valid.'
    },
    name:{
      error: 'Your name is required.'
    },
    password:{
      password: true,
      secureTextEntry: true
    }
  }
};

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
    var value = this.refs.signup.getValue();
    if (value){
      this.props.processSignupForm(value.name, value.email, value.password);
    }
  }
  render(){
    return(
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Form
          ref="signup"
          type={formModel}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSignupFormSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>
            <Text onPress={Actions.login}>
              Go to login
            </Text>
        </View>
      </ScrollView>
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

const  styles = StyleSheet.create({
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
