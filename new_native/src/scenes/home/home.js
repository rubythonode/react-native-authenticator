import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOutAction } from './home.actions';

import { View, Button, AsyncStorage, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class SignOut extends React.Component {

  constructor(props) {
  	super(props);
  	this.handleSignOut = this.handleSignOut.bind(this);
  };

  handleSignOut() {
	AsyncStorage.removeItem('token');
	AsyncStorage.removeItem('user');
    this.props.signOut();
    Actions.login();
  }

  render() {
    return (
    	<View style={{ marginTop: 70 }}>
    		<Button title="Sign Out"
				    onPress={this.handleSignOut} />
        <Text onPress={Actions.login}>Go to login</Text>
		  </View>
	)
  };
}

//export default connect()(SignOut);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signOut: signOutAction
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(SignOut) ;
