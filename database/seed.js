const faker = require('faker');
const db = require('./index.js')

const fakeUserInfoData = () => {
  let userInfo = {};
  userInfo.email = faker.internet.email().replace(/"/g, "'");
  userInfo.firstName = faker.name.firstName().replace(/"/g, "'");
  userInfo.lastName = faker.name.lastName().replace(/"/g, "'");
  userInfo.pass = faker.internet.password().replace(/"/g, "'");
  userInfo.appliedToday = faker.random.number({'min': 1, 'max': 10});
  userInfo.appliedMonth = faker.random.number({'min': 1, 'max': 20});
  userInfo.appOnSite = faker.random.number({'min': 1, 'max': 8});
  userInfo.appRejected = faker.random.number({'min': 1, 'max': 50});
  userInfo.appNoResponse = faker.random.number({'min': 1, 'max': 100});
  userInfo.loc = `${faker.address.city().replace(/"/g, "'")}, ${faker.address.state().replace(/"/g, "'")}`;
  userInfo.jobTitle = faker.name.jobTitle().replace(/"/g, "'");
  userInfo.salary = faker.random.number({'min': 50000, 'max': 150000});
  userInfo.streak = faker.random.number({'min': 0, 'max': 12});
  userInfo.totalApplied = faker.random.number({'min': 3, 'max': 20})
  return userInfo
};

const createUserInfo = () => {
  let userData = [];
  for (let i = 0; i < 10; i++) {
    userData.push(fakeUserInfoData());
  }
  return userData;
};

const userData = createUserInfo()

const insertFakeData = () => {
  userData.forEach((item) => {
    console.log('Data', item)
    let queryStr = `insert into userinfo(email, firstName, lastName, pass, appliedToday, appliedMonth, appOnSite, appRejected, appNoResponse, loc, jobTitle, salary, streak, totalApplied) values ('${item.email}', '${item.firstName}', '${item.lastName}', '${item.pass}', ${item.appliedToday}, ${item.appliedMonth}, ${item.appOnSite}, ${item.appRejected}, ${item.appNoResponse}, '${item.loc}', '${item.jobTitle}', ${item.salary}, ${item.streak}, ${item.totalApplied})`
    db.query(queryStr, (err) => {
      if(err) {console.log(err)}
      console.log("seeded!")
    })
  })
}

insertFakeData()