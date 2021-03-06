const passport = require('passport'); // declare variable for passport
const LocalStrategy = require('passport-local').Strategy; // localization of passport auth
const connection = require('../database/index.js'); // database connection
const validatePassword = require('./lib/passwordUtils.js').validatePassword;

let customFields = {
    usernameField: 'email',
    passwordField: 'pass'
}

let verifyCallback = (email, pass, done) => {

    let queryStr = `SELECT * from user_info WHERE email = '${email}';`
    connection.query(queryStr, function(err, user) {

      if (err) { 
          return done(err); 
      }

      if (!user || user.rows.length < 1) { // case where username doesn't exist
        return done(null, false, { message: 'Incorrect username.' });
      } 



      if (!validatePassword(pass, user.rows[0].pass, user.rows[0].salt) || pass.length < 1) {
        return done(null, false, { message: 'Incorrect password.'}); // success case based on validPassword
      } 
      return done(null, user.rows); // fail case based on validPassword
      
    });
}

let strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);



passport.serializeUser((user, done) => { // serialization of sessions
    done(null, user[0].email)
})

passport.deserializeUser((email, callback) => {
  if (email) {
      connection.query(`SELECT id, email FROM user_info where email='${email}';`, (err, results) => {
        if(results.rows.length < 1) {
          return callback("No email was found in database")
        }
        callback(null, results.rows[0].email)
      })
    } else {
        callback("Could not deserialize user with email of " + email, null)
    }
  })