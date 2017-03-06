const config = require('../config');
const jwt = require('jsonwebtoken');
import { USER_ROLE } from './enums';

exports.generateToken = function(userInfo){
  let payload = {
    sub: userInfo._id,
    timestamp: new Date().getTime(),
    role: userInfo.role || USER_ROLE.DEFAULT_USER_ROLE
  };

  let token = jwt.sign(payload, config.jwtSecret);

  let userData = {
    name: userInfo.name,
    role: userInfo.role || USER_ROLE.DEFAULT_USER_ROLE
  };
  return {
    success: true,
    message: 'You have successfully logged in',
    token,
    userData
  }
}
