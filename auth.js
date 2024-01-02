const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require('passport');



passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log("hello from auth");
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    // console.log(profile);
    return cb(null,profile)
  }
));

passport.serializeUser(function(user, cb) {
    console.log(user);
    cb(null, user);
  });


  passport.deserializeUser(function(user,cb){
    cb(null,user)
  })