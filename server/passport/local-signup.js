const User = require('mongoose').model('User');
const passportLocalStrategy = require('passport-local').Strategy;
const  jwt = require('jsonwebtoken');

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
			name: req.body.name,
			role: req.body.role || 'user'
		};

		let newUser = new User(userData);
		newUser.save(function(err, user) {
			if(err) { return done(err); }
			console.log('user',user);
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
