const express = require('express');
const _outController = require('./controllers/_our-controller');
const authController = require('./controllers/auth-controller');
const config = require('./config');
const passport = require('passport');

module.exports = function(app) {
	const authRoutes = express.Router();
	const apiRoutes = express.Router();
	const adminRoutes = express.Router();
	const authCheckMiddleware = require('./middleware/auth-check')(config);
	const adminAccessMiddleware = require('./middleware/admin-access')(config);

	apiRoutes.get('/helloworld', _outController.helloworld);

	authRoutes.post('/signup', authController.signup);
	authRoutes.post('/login', authController.login);

	//adminRoutes.get('/dashboard', _outController.dashboard);

	app.use('/api', authCheckMiddleware, adminAccessMiddleware);
	app.use('/api', apiRoutes);

	//app.use('/admin', authCheckMiddleware, adminAccessMiddleware);
	//app.use('/admin', adminRoutes);

	app.use('/auth', authRoutes);

  app.post('/auth/facebook', authController.facebook);
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback',
			authController.facebookLogin,
			authController.facebookRedirect);

};
