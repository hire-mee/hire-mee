const express = require('express');
const passport = require('passport'); // declare variable for passport
const bcrypt = require('bcrypt'); // password encryption/hashing
const session = require('express-session'); // require express's session
const LocalStrategy = require('passport-local').Strategy; // localization of passport auth
const passwordValidator = require('password-validator');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js')

const app = express();
const port = 3000;
const db = require('../database/index.js'); // database connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

passport.use(
    new LocalStrategy((email, password, callback) => {
    db.query('SELECT id, email, password FROM userinfo WHERE email=$1', [email], (err, result) => {
      if(err) {
        console.log('Error when selecting user on login: ', err) // changed from winston.error('Err...)
        return callback(err)
      }
  
      if(result.rows.length > 0) {
        const first = result.rows[0]
        bcrypt.compare(password, first.password, function(err, res) {
          if(res) {
            callback(null, { id: first.id, email: first.email })
           } else {
            callback(null, false, {msg: 'Incorrect Password'})
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

passport.deserializeUser((id, callback) => {
    db.query('SELECT id, email FROM userinfo WHERE id = $1', [parseInt(id, 10)], (err, results) => {
      if(err) {
        console.log('Error when selecting user on session deserialize', err)
        return callback(err)
      }
  
      callback(null, results.rows[0])
    })
  })

app.use(session({ secret: "bubba-gump", resave: false, saveUninitialized: true, cookie: {maxAge: 3600000} }));
app.use((req, res, callback) => {
    console.log(req.session);
    return callback();
})
app.use(passport.initialize()) // passport initialization
app.use(passport.session()) // passport session

app.use('/api', router);

app.post('/signup', (req, res, callback) => {

    // validate our password to have these critieria 

    var validateCriteria = new passwordValidator();
    validateCriteria
        .is().min(6)
        .is().max(100)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()   
    
    let passwordvalidation = validateCriteria.validate(req.body.password);
    
    if (passwordvalidation) {
    bcrypt.hash(req.body.password, 10, (err, hashed) => {
        if(err) {
            return callback(err);
        } else {
            let searchQuery = `SELECT email FROM userinfo WHERE email = ${req.body.email}`
            db.query(searchQuery, (err, result)=> {
                if (null, result.rows) {
                    res.status(400).send("User already exists!", err)
                } else {
                    let queryStr = `INSERT INTO userinfo (email, firstName, lastName, pass) VALUES ('${email}', '${firstName}', '${lastName}', '${hashed}');`;
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

app.post('/login', passport.authenticate('local'), (req, res, callback) => {
    req.login(req.user, (err) => {
        console.log(req.user, req.session);
        if(err) {
            return callback(err);
        } else {
            var userInfo = {
            email: req.user.email,
            redirect: '/'
            }
            res.json(req.user); // res.json sends back user information to front-end during axios
        }
    });
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));