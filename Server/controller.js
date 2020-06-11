const helper = require('../database/helper.js');
// var firebase = require('firebase/app');
// require('firebase/auth');
// const firebaseConfig = require('../hire-mee-firebase-adminsdk-dl9qo-9291f8dd0e.json');
// firebase.initializeApp(firebaseConfig);

module.exports = {
  login: (req, res) => {
    let { email } = req;
    if (err) { res.status(400).send(err) }
    res.status(200).send(email);
  },
  getInfo: (req, res) => {
    helper.getInfo((err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(result);
    });
  },
  signUpPostInfo: (req, res) => {
    helper.signUpPostInfo(req.body, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send(result);
    })
  },
  // signUpPostInfo: (req, res) => {
  //   console.log('data', req.body);
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(req.body.email, req.body.pass)
  //     .catch(function (err) {
  //       var errorCode = err.code;
  //       var errorMessage = err.message;
  //     });

  //   helper.postInfo(userData, (err, result) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     }
  //     res.status(200).send('User Created');
  //   });
  // },
  postInfo: (req, res) => {
    console.log('data', req.body);
    helper.postInfo(req.body, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Posted data');
    });
  },
  updateInfo: (req, res) => {
    helper.updateInfo(req.body, req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Updated data');
    });
  },
  deleteInfo: (req, res) => {
    helper.deleteInfo(req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Deleted User');
    });
  },
  getApplications: (req, res) => {
    helper.getApplications(req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(result);
    });
  },
  postApplications: (req, res) => {
    helper.postApplications(req.body, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Posted application data');
    });
  },
  updateApplications: (req, res) => {
    helper.updateApplications(req.body, req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Updated application data');
    });
  },
  deleteApplications: (req, res) => {
    helper.deleteApplications(req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Deleted application data');
    });
  }
};
