const helper = require('../database/helper.js');

module.exports = {
  login: (req, res) => {
    let { email } = req;
    if (err) { res.status(400).send(err) }
    res.status(200).send(email);
  },
  getInfo: (req, res) => {
    helper.getInfo((err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send(result);
    })
  },
  postInfo: (req, res) => {
    helper.postInfo(req.body, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send("Posted data");
    })
  },
  updateInfo: (req, res) => {
    helper.updateInfo(req.body, req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send("Updated data");
    })
  },
  deleteInfo: (req, res) => {
    helper.deleteInfo(req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send("Deleted User");
    })
  },
  getApplications: (req, res) => {
    helper.getApplications(req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send(result);
    })
  },
  postApplications: (req, res) => {
    helper.postApplications(req.body, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send("Posted application data");
    })
  },
  updateApplications: (req, res) => {
    helper.updateApplications(req.body, req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send("Updated application data");
    })
  },
  deleteApplications: (req, res) => {
    helper.deleteApplications(req.params.id, (err, results) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send("Deleted application data");
    })
  }
}