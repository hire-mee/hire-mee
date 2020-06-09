const db = require('./index.js')

module.exports = {
  // userInfo table
  getInfo(callback) {
    const queryStr = `SELECT * FROM userinfo;`;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  postInfo(input, callback) {
    const { email , firstName, lastName, pass, appliedToday, loc, jobTitle, salary, streak, totalApplied } = input
    const queryStr = `INSERT INTO userinfo(email, firstName, lastName, pass, appliedToday, loc, jobTitle, salary, streak, totalApplied) VALUES ('${email}', '${firstName}', '${lastName}', '${pass}', ${appliedToday}, '${loc}', '${jobTitle}', ${salary}, ${streak}, ${totalApplied});`;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  updateInfo(input, id, callback) {
    const { appliedToday, loc, jobTitle, salary, streak, totalApplied } = input
    const queryStr = `UPDATE userinfo SET appliedToday=${appliedToday}, loc='${loc}', jobTitle='${jobTitle}', salary=${salary}, streak=${streak}, totalApplied=${totalApplied} WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  deleteInfo(id, callback) {
    const queryStr = `DELETE FROM userinfo WHERE id=${id};`;
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
    const queryStr = `SELECT * FROM applications WHERE userId=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  postApplications(input, id, callback) {
    const { category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink } = input
    const queryStr = `INSERT INTO applications(userId, category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink) VALUES (${id}, '${category}', '${color}', '${companyName}', '${descr}', '${loc}', '${positionTitle}', ${salary}, '${submitDate}', '${deadline}', '${urlLink}') WHERE userId=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  updateApplications(input, id, callback) {
    const { category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink } = input
    const queryStr = `UPDATE applications SET category='${category}', color='${color}', companyName='${companyName}', descr='${descr}', loc='${loc}', positionTitle='${positionTitle}', salary=${salary}, submitDate='${submitDate}', deadline='${deadline}', urlLink='${urlLink}' WHERE userId=${id}`;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
  deleteApplications(id, callback) {
    const queryStr = `DELETE FROM applications WHERE userId=${id}`;
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.row);
      }
    })
  },
}