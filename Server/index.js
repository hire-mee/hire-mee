const express = require('express');
const session = require('express-session'); // require express's session
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router.js')
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config(); // allows the use of secret keys in rootdirectory/.env file


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/signup', express.static(path.join(__dirname, '../client/dist')));
app.use('/redirect', express.static(path.join(__dirname, '../client/dist')));
app.use('/login', express.static(path.join(__dirname, '../client/dist')));
app.use('/main', express.static(path.join(__dirname, '../client/dist')));
app.use('/main/jobs', express.static(path.join(__dirname, '../client/dist')));
app.use('/main/statistics', express.static(path.join(__dirname, '../client/dist')));
app.use('/main/friends', express.static(path.join(__dirname, '../client/dist')));
app.use('/main/leaderboard', express.static(path.join(__dirname, '../client/dist')));
app.use('/main/map', express.static(path.join(__dirname, '../client/dist')));
app.use('/main/settings', express.static(path.join(__dirname, '../client/dist')));




app.use(
  session({
    // secret: process.env.SECRET,
    secret: "hot",
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)


require('./passport.js'); // require 'passport.use(strategy) from passport.js
app.use(passport.initialize()) // calls passport initialization
app.use(passport.session()) // calls passport session


app.use('/api', router);

app.use((req, res, next) => {
  let html = `
  <div style="margin:50px auto; font-family: Verdana; color:#3e4080; text-align:center;">
            <div style="font-size:8em; font-weight: 400; background:-webkit-linear-gradient(#3e4080, #d85893); -webkit-background-clip: text;  -webkit-text-fill-color: transparent;">404</div>
            <div style="font-weight: 400;" >Uh oh, seems like we don't have this page yet. Try going</div>
            <div style="font-weight: 400;" >back to the previous page or contact the dev team to </div>
            <div style="font-weight: 400;" >(maybe) turn this page into reality :)</div>
    </div>
    `;
  res.status(404).send(html)
})

app.listen(PORT, () => console.log(`Hiremee now live at port: ${PORT}`));

if (process.env.NODE_ENV === "production") {   //server static content, npm run build-prod
  app.use('/', express.static(path.join(__dirname, '../client/dist/build')))
  app.use('/signup', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/redirect', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/login', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/main', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/main/jobs', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/main/statistics', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/main/friends', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/main/leaderboard', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/main/map', express.static(path.join(__dirname, '../client/dist/build')));
  app.use('/main/settings', express.static(path.join(__dirname, '../client/dist/build')));
}