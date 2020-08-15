const express = require('express');
const session = require('express-session'); // require express's session
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js')
const app = express();
const oldPort = 3000;
const PORT = process.env.PORT || 3000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined



require('dotenv').config(); // allows the use of secret keys in rootdirectory/.env file


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../client/dist')));



const db = require('../database/index.js'); // database connection

// const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'session'})
//   store: sessionStore,
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

require('./passport.js'); // require 'passport.use(strategy) from passport.js
app.use(passport.initialize()) // calls passport initialization
app.use(passport.session()) // calls passport session

app.use('/api', router);
app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));

if(process.env.NODE_ENV === "production"){
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, '../client/dist/build')))
}