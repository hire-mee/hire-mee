const helper = require('../database/helper.js');

module.exports = {
  getInfo: (req, res) => {
    helper.getInfo((err, results) => {
      if (err) { res.status(400).json(err) }
      res.status(200).json(results);
    })
  },
  postInfo: (req, res) => {
    helper.postInfo(data, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("posted data");
    })
  },
  updateInfo: (req, res) => {
    helper.updateInfo(id, data, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("updated data", result);
    })
  },
  deleteInfo: (req, res) => {
    helper.deleteInfo(id, (err, result) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json("Deleted User");
    })
  },
  getApplications: (req, res) => {
    helper.getApplications((err, result) => {
      if (err) { res.status(400).json(err) }
      res.status(200).json(result);
    })
  },
  postApplication: (req, res) => {
    helper.postApplication(req.body, req.params.id, (err, result) => {
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