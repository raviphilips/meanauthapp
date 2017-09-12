const JwtStrategy = require('passport-jwt').Strategy; //
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // for passport-jwt ver 2.0 ExtractJwt.fromAuthHeaderWithScheme("jwt")
	opts.secretOrKey = config.secret; //for passport-jwt ver 3.0  ExtractJwt.fromAuthHeaderAsBearerToken()
	passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
		console.log(jwt_payload);
		User.getUserById(jwt_payload._doc._id, (err, user) => {
			if(err){
				return done(err, false);
			}

			if(user){
				return done(null, user);
			}else {
				return done(null, false);
			}
		});
	}));
}