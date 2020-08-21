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

      console.log("returned user object in passport verifycallback", user.rows)
      if (err) { 
          return done(err); 
      }

      if (!user || user.rows.length < 1) {
        return done(null, false);
      } 

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



passport.serializeUser((user, done) => { // serialization of sessions
    console.log('SerializeUser function called.');
    
    done(null, user.rows[0].email)
})

passport.deserializeUser((email, callback) => {
  if (email) {
      connection.query(`SELECT id, email FROM user_info where email='${email}';`, (err, results) => {
        if(err) {
          console.log('Error when selecting user on session deserialize', err)
          return callback(err)
        }
    
        callback(null, results.rows[0])
      })
    } else {
        callback("Could not deserialize user with email of " + email, null)
    }
  })