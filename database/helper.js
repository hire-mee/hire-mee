const db = require('./index.js')
const genPassword = require('../server/lib/passwordUtils.js').genPassword;

module.exports = {
  //==========================================================================================================
  //====================================USER INFO TABLE=======================================================
  //==========================================================================================================
  getInfo(callback) {
    const queryStr = `SELECT * FROM user_info;`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  getUserData(id, callback) {
    const queryStr = `SELECT * FROM user_info where id = ${id};`
    db.query(queryStr, (err, results) => {
      if (err) {
        console.error(`ERROR: `, err);
      } else {
        callback(null, results.rows)
      }
    })
  },
  getUserByEmail(input, callback) {
    let { email } = input
    const queryStr = `SELECT * FROM user_info where email = '${email}';`
    db.query(queryStr, (err, results) => {
      if (err) {
        console.error(`ERROR: `, err);
      } else {
        callback(null, results.rows)
      }
    })
  },
  signUpPostInfo(input, callback) {
    let { email, first_name, last_name, pass } = input

    const saltHash = genPassword(pass);
    const salt = saltHash.salt;
    pass = saltHash.hash;

    const queryStr = `INSERT INTO user_info(email, first_name, last_name, salt, pass) VALUES ('${email}', '${first_name}', '${last_name}', '${salt}','${pass}');`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateInfo(input, id, callback) {
    const { applied_today, applied_month, total_applied } = input
    const queryStr = `UPDATE user_info SET applied_today=${applied_today}, applied_month=${applied_month}, total_applied=${total_applied} WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateName(input, id, callback) {
    const { first_name, last_name } = input
    const queryStr = `UPDATE user_info SET first_name='${first_name}', last_name='${last_name}' WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateApps(input, id, callback) {
    const { applied_today, applied_month } = input;
    const queryStr = `UPDATE user_info SET applied_today=${applied_today}, applied_month=${applied_month} WHERE id=${id};`
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  deleteInfo(id, callback) {
    const queryStr = `DELETE FROM user_info WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
//==========================================================================================================
//==================================== APPLICATIONS TABLE===================================================
//==========================================================================================================
  getApplications(id, callback) {
    const queryStr = `SELECT * FROM applications WHERE user_id = ${id};`;
      db.query(queryStr, (err, results) => {
        if (err) {
          callback(`ERROR: `, err);
        } else {
          callback(null, results.rows);
        }
      })
  },
  postApplications(input, callback) {
    let { user_id, category, company_name, app_description, app_location, position_title, salary, submit_date, deadline, url_link } = input;
    let queryStr = `INSERT INTO applications(user_id, category, company_name, app_description, app_location, position_title, salary, submit_date, deadline, url_link) VALUES (${user_id}, '${category}', '${company_name}', '${app_description}', '${app_location}', '${position_title}', ${salary}, '${submit_date}', '${deadline}', '${url_link}');`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateApplications(input, id, callback) {
    const { category, color, company_name, app_description, app_location, position_title, salary, submit_date, deadline, url_link } = input
    const queryStr = `UPDATE applications SET category='${category}', color='${color}', company_name='${company_name}', app_description='${app_description}', app_location='${app_location}', position_title='${position_title}', salary=${salary}, submit_date='${submit_date}', deadline='${deadline}', url_link='${url_link}' WHERE id=${id};`;
      db.query(queryStr, (err, results) => {
        if (err) {
          callback(`ERROR: `, err);
        } else {
          callback(null, results.rows);
        }
      })
  },
  deleteApplications(id, callback) {
    const queryStr = `DELETE FROM applications WHERE id=${id}`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateSalary(salary, id, callback) {
    const queryStr = `UPDATE user_info SET salary = ${salary} WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  },
  updateAllProfileSettings(data, id, callback) {
    let { first_name, last_name, salary } = data
    const queryStr = `UPDATE user_info SET first_name = '${first_name}', last_name = '${last_name}',salary=${salary} WHERE id=${id};`;
    db.query(queryStr, (err, results) => {
      if (err) {
        callback(`ERROR: `, err);
      } else {
        callback(null, results.rows);
      }
    })
  }
}
  //==========================================================================================================
  //====================================FRIENDS TABLE=======================================================
  //==========================================================================================================
