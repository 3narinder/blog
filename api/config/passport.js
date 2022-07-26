const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;
const { jwt } = require("./key");

const User = require("../models/UserModel");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwt.secret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};

passport.serializeUser((user, done) => {
  console.log("Serialized" + user);
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserialized" + id);
  return User.findById(id, (err, user) => done(err, user));
});
