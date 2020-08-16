const helper = require('../database/helper.js');

module.exports = {
  loginSuccess: (req, res) => {
    res.status(200).end();
  },
  loginFailure: (req, res) => {
    res.status(200).redirect('/localhost:3000');
  },
  getInfo: (req, res) => {
    helper.getInfo((err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(result);
    });
  },
  updateInfo: (req, res) => {
    helper.updateInfo(req.body, req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send(result)
    })
  },
  getUserData: (req, res) => {
    helper.getUserData(req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send(result)
    })
  },
  getUserByEmail: (req, res) => {
    helper.getUserByEmail(req.params, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send(result)
    })
  },
  signUpPostInfo: (req, res) => {
    helper.signUpPostInfo(req.body, (err, result) => {
      if (err) { res.status(400).send(err) }
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
    helper.updateName(req.body, req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err)
      }
      res.status(200).send('Updated name')
    })
  },
  updateAddress: (req, res) => {
    helper.updateAddress(req.body, req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err)
      }
      res.status(200).json(req.body)
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
    helper.getApplications(req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(results);
    })
  },
  postApplications: (req, res) => {
    helper.postApplications(req.body, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Posted Application');
    })
  },
  updateApplications: (req, res) => {
    helper.updateApplications(req.body, req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Updated user data');
    })
  },
  deleteApplications: (req, res) => {
    helper.deleteApplications(req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Deleted application data');
    });
  },
  updateSalary: (req, res) => {
    helper.updateSalary(req.body.salary, req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Updated user\'s salary!');
    });
  },
  updateAllProfileSettings: (req, res) => {
    helper.updateAllProfileSettings(req.body, req.params.id, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('Updated user\'s first name, last name, salary!');
    });
  },
  addFriend: (req, res) => {
    helper.addFriend(req.body, req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send(result)
    })
  },
  getFriends: (req, res) => {
    helper.getFriends(req.params.id, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(result);
    });
  },
};