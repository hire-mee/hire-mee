const helper = require('../database/helper.js');

module.exports = {
  getInfo: (req, res) => {
    helper.getInfo((err, results) => {
      if (err) { res.status(400).json(err) }
      res.status(200).json(results);
    })
  },
  postInfo: (req, res) => {
    helper.postInfo(req.body, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("posted data");
    })
  },
  updateInfo: (req, res) => {
    helper.updateInfo(req.body, req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("updated data", result);
    })
  },
  deleteInfo: (req, res) => {
    helper.deleteInfo(req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("Deleted User");
    })
  },
  getApplications: (req, res) => {
    helper.getApplications(req.params.id, (err, result) => {
      if (err) { res.status(400).json(err) }
      res.status(200).json(result);
    })
  },
  postApplications: (req, res) => {
    helper.postApplications(req.body, req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("Posted application data");
    })
  },
  updateApplications: (req, res) => {
    helper.updateApplications(req.body, req.params.id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("Updated application data");
    })
  },
  deleteApplications: (req, res) => {
    helper.deleteApplications(req.params.id, (err, results) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("Updated application data");
    })
  }
}