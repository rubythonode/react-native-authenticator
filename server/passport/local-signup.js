const User = require('mongoose').model('User');
const passportLocalStrategy = require('passport-local').Strategy;
const  jwt = require('jsonwebtoken');
import { USER_ROLE } from '../helpers/enums';

module.exports = function(config) {

	return new passportLocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true
	}, function(req, email, password, done) {
		let userData = {
			email: email,
			password: password,
			social: req.body.social ? req.body.social : { facebook: { token: null } },
			name: req.body.name,
			role: req.body.role || USER_ROLE.DEFAULT_USER_ROLE
		};

		let newUser = new User(userData);
		newUser.save(function(err, user) {
			if(err) { return done(err); }
			let payload = {
				sub: user._id,
				timestamp: new Date().getTime(),
				role: user.role
			};

			let token = jwt.sign(payload, config.jwtSecret);

			let userData = {
				name: user.name,
				role: user.role
			};

			return done(null, token, userData);
		});
	});
};
