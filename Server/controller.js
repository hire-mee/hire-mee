const helper = require('../database/helper.js');

module.exports = {
  getData: (req, res) => {
    helper.getData((err, results) => {
      if (err) { res.status(400).send(err) }
      res.status(200).json(results);
    })
  }
}