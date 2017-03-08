const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('mongoose').model('User'),
    config = require('../config');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.jwtSecret;

module.exports = function(){
    return new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({_id: jwt_payload.sub}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              console.log(user);
              done(null, user);
          } else {
              done(null, false);
          }
      });
  });
}
