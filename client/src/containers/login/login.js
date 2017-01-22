import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Card, CardTitle, CardText, RaisedButton, TextField } from 'material-ui';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signInAction, setAdminPrevilegeAction, signInErrorAction } from './login.action';

export class Login extends Component {
	
	constructor() {
	    super();
	    this.state = {
	    	email: '',
	    	password: ''
	    };
	    this.processForm = this.processForm.bind(this);
	};

	processForm(event) {
		event.preventDefault();
		
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
		       
		        localStorage.setItem('token', response.data.token);
		       	localStorage.setItem('user', JSON.stringify(response.data.userData));

		        browserHistory.push('/home');
		        
		    }
		}).catch((errors) => {
        	// change the component state
        	this.props.setErrors(errors);
		});
	}

	render() {
		return (
			<Card class="container">
				<form action="/" onSubmit={this.processForm}>
					<h2 className="card-heading">Log In</h2>

					<CardTitle title="Login with Email" />

					<p className="error-message"></p>

					<div className="field-line">
						<TextField value={this.state.email} floatingLabelText="Email" 
						errorText={ (this.props.errors) ? this.props.errors : '' }
						onChange={(event) => this.setState({ email: event.target.value})} />
					</div>

					<div className="field-line">
						<TextField value={this.state.password} floatingLabelText="Password"
						errorText={ (this.props.errors) ? this.props.errors : '' } 
						onChange={(event) => this.setState({ password: event.target.value})}/>
					</div>

					<div className="button-line">
						<RaisedButton type="submit" label="Login" primary={true} />
					</div>
					<a href="http://localhost:3000/auth/facebook">Login with Facebook</a>	
					<CardText>Dont have an account?<Link to={`/signup`}>Create One</Link></CardText>
				</form>
			</Card>
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
