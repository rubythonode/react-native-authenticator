const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
	email: { type: String, index: { unique: true }},
	password: String,
	name: String,
	role: String
});

UserSchema.methods.comparePassword = function(password, callback) {
	bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function(next) {
	let user = this;
	if(!user.isModified('password')) return next();

	bcrypt.genSalt(function(err, salt) {
		if(err) { return next(err); }

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) { return next(err); }

			user.password = hash;

			return next();
		});
	});
});

module.exports = mongoose.model('User', UserSchema);