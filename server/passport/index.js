const passport = require('passport');

module.exports = function(config) {
	const localSignupStrategy = require('./local-signup')(config);
	const localLoginStrategy = require('./local-login')(config);
	const facebookLoginStrategy = require('./facebook-login')(config);
	const passportjwt = require('./passport-jwt')(config);

	passport.use('local-signup', localSignupStrategy);
	passport.use('local-login', localLoginStrategy);
	passport.use('facebook', facebookLoginStrategy);
	passport.use('jwt', passportjwt);
};
