const passport = require('passport'); // declare variable for passport
const LocalStrategy = require('passport-local').Strategy; // localization of passport auth
const connection = require('../database/index.js'); // database connection
const validatePassword = require('./lib/passwordUtils.js').validatePassword;

let customFields = {
    usernameField: 'email',
    passwordField: 'pass'
}

let verifyCallback = (email, pass, done) => {
    let queryStr = `SELECT * from userinfo WHERE email = '${email}';`
    connection.query(queryStr, function(err, user) {
      if (err) { 
          return done(err); 
      }

      if (!user) {
        return done(null, false);
      }
    //   console.log("HELLO FROM ERROR BLOCK OF VERIFYCALLBACK@@@@@@@@@@@@@@: ", user)
      const isValid = validatePassword(pass, user.rows[0].pass, user.rows[0].salt); // verifies input attempt with hash in DB

      if (isValid) {
        return done(null, user); // success case based on validPassword
      } else {
        return done(null, false); // fail case based on validPassword
      }
    });
}

let strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// serialization of sessions

passport.serializeUser((user, done) => {
    // console.log("HELLO FROM ERROR BLOCK OF SERIALUSER@@@@@@@@@@@@@@: ", user)
    console.log('SerializeUser function called.');
    
    done(null, user.rows[0].email)
})

passport.deserializeUser((email, callback) => {
    connection.query('SELECT id, email FROM userinfo WHERE email = $1', [email], (err, results) => {
      if(err) {
        console.log('Error when selecting user on session deserialize', err)
        return callback(err)
      }
  
      callback(null, results.rows[0])
    })
  })