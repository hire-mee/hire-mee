const helper = require('../database/helper.js');

module.exports = {
  loginSuccess: (req, res) => {
    res.status(200).send('9'); // hardcoded for the time being
  },
  loginFailure: (req, res) => {
    res.status(200).redirect('localhost:3000');
  },
  getInfo: (req, res) => {
    helper.getInfo((err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(result);
    });
  },
  updateInfo : (req, res) => {
    helper.updateInfo(req.body, req.params.id, (err, result) => {
      if (err) { res.status(400).send(err)}
      res.status(200).send(result)
    })
  },
  getUserData: (req, res) => {
    helper.getUserData(req.params.id, (err, result) => {
      if (err) { res.status(400).send(err)}
      res.status(200).send(result)
    })
  },
  signUpPostInfo: (req, res) => {
    helper.signUpPostInfo(req.body, (err, result) => {
      if (err) { res.status(400).send(err)}
      res.status(200).send(result)
    })
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
