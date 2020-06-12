const express = require('express');
const session = require('express-session'); // require express's session
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js')
const app = express();
const port = 3000;

require('dotenv').config(); // allows the use of secret keys in rootdirectory/.env file


app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../client/dist')));



const db = require('../database/index.js'); // database connection

// const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'session'})
//   store: sessionStore,
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,

  cookie: {
    maxAge: 1000* 60 * 60 * 24 
  }
}))

require('./passport.js'); // require 'passport.use(strategy) from passport.js
app.use(passport.initialize()) // calls passport initialization
app.use(passport.session()) // calls passport session

app.use('/api', router);
app.listen(port, () => console.log(`app listening at http://localhost:${port}`));


/*
const passport = require('passport'); // declare variable for passport
const LocalStrategy = require('passport-local').Strategy; // localization of passport auth
const bcrypt = require('bcrypt'); // password encryption/hashing


const passwordValidator = require('password-validator');


passport.use(
    new LocalStrategy((email, pass, callback) => {
    db.query(`SELECT * FROM userinfo WHERE email = '${email}'`, (err, result) => {
      if(err) {
        console.log('Error when selecting user on login: ', err) // changed from winston.error('Err...)
        return callback(err)
      }
  
      if(result.rows.length > 0) {
        const first = result.rows[0]
        console.log("Inside Local Strategy before bcrypt comparison@@@@@@@@@@@@@@@@@@")
        bcrypt.compare(pass, first.pass, function(err, valid) {
          if(valid) {
            return callback(null, { id: first.id, email: first.email })
           } else {
            return callback(null, false, {msg: 'Incorrect Password'})
           }
         })
       } else {
         callback(null, false, {msg: 'Incorrect username'})
       }
    })
  }))

passport.serializeUser((user, done) => {
    console.log('SerializeUser function called.');
    done(null, user.id)
})

passport.deserializeUser((email, callback) => {
    db.query('SELECT id, email FROM userinfo WHERE email = $1', [email], (err, results) => {
      if(err) {
        console.log('Error when selecting user on session deserialize', err)
        return callback(err)
      }
  
      callback(null, results.rows[0])
    })
  })

app.post('/signup', (req, res, callback) => {
    var validateCriteria = new passwordValidator(); // validate our password to have these critieria 
    validateCriteria.is().min(6);
        // .is().max(100)
        // .has().uppercase()
        // .has().lowercase()
        // .has().digits()
        // .has().not().spaces()   
    let passwordvalidation = validateCriteria.validate(req.body.pass);
    if (passwordvalidation) {
        bcrypt.hash(req.body.pass, 10, (err, hashed) => {
            if(err) {
                callback(err);
            } else {
                let searchQuery = `SELECT email FROM userinfo WHERE email = ${req.body.email}`
                db.query(searchQuery, (err, result)=> {
                    if (result) {
                        // res.status(400).send("User already exists!", err)
                        callback("User already exists!", err)
                    } else {
                        let queryStr = `INSERT INTO userinfo (email, firstName, lastName, pass) VALUES ('${req.body.email}', '${req.body.firstName}', '${req.body.lastName}', '${hashed}');`;
                        db.query(queryStr, (err, data) => {
                            if(err) {console.log(err)};
                            let redirect = { redirect: '/' }
                            res.json(redirect)
                        });
                    }
                })
            }
        })
    } else { // else block from passwordValidation condition
        let password_error = {password_error: 'Your password must have an uppercase letter, lowercase letter, and number' };
        res.json(password_error);
    }
})

app.post('/login', passport.authenticate('local', { failureRedirect : '/login-failure', successRedirect : '/login-success'}), (req, res, callback) => {
      // call req.login for callback is needed in order to call serialize and deserialize functions
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      req.session.user = req.user;
      console.log("hello i am from post login", req.user)
      res.json(req.user);
})

app.get('/login-success', (req, res) => {
  res.send('<h1> successfully logged in and authenticated!</h1>')
})

app.get('/login-failure', (req, res) => {
  res.send('<h1> FAILED logging-in!</h1>')
})

app.use(session({ secret: "bubba-gump", resave: false, saveUninitialized: true, cookie: {maxAge: 3600000} }));
app.use((req, res, callback) => {
    console.log("this is session being passed back", req.session);
    return callback();
})

app.use(passport.initialize()) // passport initialization
app.use(passport.session()) // passport session
*/