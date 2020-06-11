const faker = require('faker');
const db = require('./index.js')

const fakeUserInfoData = () => {
  let userInfo = {};
  userInfo.email = faker.internet.email();
  userInfo.firstName = faker.name.firstName();
  userInfo.lastName = faker.name.lastName();
  userInfo.pass = faker.internet.password();
  userInfo.appliedToday = faker.random.number({'min': 1, 'max': 10});
  userInfo.loc = `${faker.address.city()}, ${faker.address.state()}`;
  userInfo.jobTitle = faker.name.jobTitle();
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
    var updatedItem = item.replace(/"/g, "'");
    console.log('Data', item)
    let queryStr = `insert into userinfo(email, firstName, lastName, pass, appliedToday, loc, jobTitle, salary, streak, totalApplied) values ${item.email}, ${item.firstName}, ${item.lastName}, ${item.pass}, ${item.appliedToday}, ${item.loc}, ${item.jobTitle}, ${item.salary}, ${item.streak}, ${item.totalApplied}`
    db.query(queryStr, (err, result) => {
      if(err) {console.log(err)}
      console.log("seeded!")
    })
  })
}

insertFakeData()