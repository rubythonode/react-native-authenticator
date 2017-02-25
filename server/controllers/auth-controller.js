const validator = require('validator'),
      passport = require('passport');

exports.signup = function(req, res, next) {
  console.log('body', req.body)
  let validationResult = validateSignupForm(req.body);
  console.log('validationResult', validationResult);
	if(!validationResult.success) {
		return res.status(400).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors
		});
	}

  passport.authenticate('local-signup', function(err, token, userData) {
    if(err) {
      if(err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors',
          errors: {
            email: 'This email is already taken'
          }
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form'
      });
    }
    return res.json({
      success: true,
      message: 'You have successfully logged in',
      token,
      userData
    })


  })(req, res, next);
};

exports.facebookLogin = (req, res, next) => {

   passport.authenticate('facebook', {
            failureRedirect: 'http://localhost:8082/login',
            session: false }
   )(req, res, next);
};

exports.facebookRedirect = (req, res, next) => {
  console.log('user', req.user);
  res.redirect('http://localhost:8082?token='+req.user);
};

exports.login = function(req, res, next) {
  let validationResult = validateLoginForm(req.body);
	if(!validationResult.success) {
		return res.status(400).json({
			success: false,
			message: validationResult.message,
			errors: validationResult.errors
		});
	}

  passport.authenticate('local-login', function(err, token, userData) {
    if(err) {
      console.dir(err)
      if(err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: 'Check the form for errors',
          errors: { email: err.message }
        })
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form'
      });
    }
    return res.json({
      success: true,
      message: 'You have successfully logged in',
      token,
      userData
    })
  })(req, res, next);
};

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for a whole form.
 */
function validateSignupForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';
  if (!payload.email || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (!payload.password || !validator.isLength(payload.password, 8)) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
  }

  if (!payload.name || payload.name.length === 0) {
    isFormValid = false;
    errors.name = "Please provide your name.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  let isFormValid = true;
  let errors = {};
  let message = '';
  if (!payload.email) {
    isFormValid = false;
    errors.email = "Please provide your email address.";
  }

  if (!payload.password || payload.password.length === 0) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message: message,
    errors: errors
  };
}
