const db = require('./index.js')

module.exports = {
  // userInfo table
  getInfo(callback) {
    let queryStr = `SELECT * FROM userInfo`;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  postInfo(input, callback) {
    let queryStr = `INSERT INTO `;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  signUp(input, callback) {
    let queryStr = `INSERT INTO `;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  updateInfo(id, callback) {
    let queryStr = `UPDATE `;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  deleteInfo(id, callback) {
    let queryStr = `DELETE `;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  // application table
  getApplications(id, callback) {
    let queryStr = `SELECT * FROM `;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  postApplications(callback) {
    let queryStr = `INSERT INTO `;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  updateApplications(id, callback) {
    let queryStr = `UPDATE `;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  deleteApplications(id, callback) {
    let queryStr = `DELETE `;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
}