const mongoose = require('mongoose');

module.exports = function(config) {
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db, function(err) {
		if(err) { throw err; }
	});

	require('./user');
};