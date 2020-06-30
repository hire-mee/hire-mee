const helper = require('../database/helper.js');

module.exports = {
  loginSuccess: (req, res) => {
    res.status(200).end();
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
  getUserByEmail: (req, res) => {
    helper.getUserByEmail(req.params, (err, result) => {
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
  postInfo: (req, res) => {
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
  updateApps: (req, res) => {
    helper.updateApps(req.body, req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('UpdatedApps');
    })
  },
  updateName: (req, res) => {
    console.log('update name req.body', req.body)
    console.log('update name req.params', req.params)
    helper.updateName(req.body, req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err)
      }
      res.status(200).send('Updated name')
    })
  },
  deleteInfo: (req, res) => {
    helper.deleteInfo(req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Deleted User');
    });
  },
  getApplications: (req, res) => {
    helper.getApplications(req.params.id)
    .then((result)=>{
      res.status(200).send(result)
    })
    .catch((err)=>{
      console.error(err);
      res.status(404).send('Cant Find Applications')
    })
  },
  postApplications: (req,res) => {
    console.log(req.body)
    helper.postApplications(req.body)
  },
  updateApplications: (req, res) => {
    helper.updateApplications(req.body, req.params.id)
    .then((result)=>{
      res.status(200).send(result)
      res.end();
    })
    .catch((err)=>{
      console.error(err);
      res.status(404).send(err)
    })
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
