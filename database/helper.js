const db = require('./index.js')
const genPassword = require('../server/lib/passwordUtils.js').genPassword;

module.exports = {
  // userInfo table
  getInfo(callback) {
    const queryStr = `SELECT * FROM userinfo;`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  getUserData(id, callback){
    const queryStr = `SELECT * FROM userinfo where id = ${id};`
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.rows)
      }
    })
  },
  getUserByEmail(input, callback){
    let { email } = input   //input passed from req.params in controller
    const queryStr = `SELECT * FROM userinfo where email = '${email}';`
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(`ERROR: `, err);
      } else {
        callback(null, results.rows)
      }
    })
  },
  signUpPostInfo(input, callback) {
    let { email , firstname, lastname, pass } = input

    const saltHash = genPassword(pass);
    const salt = saltHash.salt;
    pass = saltHash.hash;

    const queryStr = `INSERT INTO userinfo(email, firstname, lastname, salt, pass) VALUES ('${email}', '${firstname}', '${lastname}', '${salt}','${pass}');`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateInfo(input, id, callback) {
    const { appliedtoday, appliedmonth, apponsite, apprejected, appnoresponse, loc, jobtitle, salary, streak, totalapplied } = input
    const queryStr = `UPDATE userinfo SET appliedtoday=${appliedtoday}, appliedmonth=${appliedmonth}, apponsite=${apponsite}, apprejected=${apprejected}, appnoresponse=${appnoresponse}, loc='${loc}', jobtitle='${jobtitle}', salary=${salary}, streak=${streak}, totalapplied=${totalapplied} WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
       callback(err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateName(input, id, callback) {
    const { firstName, lastName } = input
    const queryStr = `UPDATE userinfo SET firstName='${firstName}', lastName='${lastName}' WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateApps(input, id, callback) {
    const { appliedToday, appliedMonth } = input;
    const queryStr = `UPDATE userinfo SET appliedToday=${appliedToday}, appliedMonth=${appliedMonth} WHERE id=${id};`
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  deleteInfo(id, callback) {
    const queryStr = `DELETE FROM userinfo WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  // application table
  getApplications(id, callback) {
    const queryStr = `SELECT * FROM applications WHERE userId = ${id};`;

    return new Promise((resolve,reject)=>{
      db.query(queryStr)
      .then((results)=>{
        resolve(results.rows);
      })
      .catch((err)=>{
        reject(new Error(`Cant Find Applications...${err}`))
      })
    })
  },
  postApplications(input) {
    let { userId, category, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink } = input;
    let queryStr = `INSERT INTO applications(userId, category, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink) VALUES (${userId}, '${category}', '${companyName}', '${descr}', '${loc}', '${positionTitle}', ${salary}, '${submitDate}', '${deadline}', '${urlLink}');`;
    db.query(queryStr)
    .then(()=>console.log('Successfully Posted New Application'))
    .catch((err)=>console.error('Error Posting Application:',err))
  },
  updateApplications(input, id, callback) {
    const { category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink } = input
    const queryStr = `UPDATE applications SET category='${category}', color='${color}', companyName='${companyName}', descr='${descr}', loc='${loc}', positionTitle='${positionTitle}', salary=${salary}, submitDate='${submitDate}', deadline='${deadline}', urlLink='${urlLink}' WHERE userId=${id}`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  deleteApplications(id, callback) {
    const queryStr = `DELETE FROM applications WHERE userId=${id}`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
}

