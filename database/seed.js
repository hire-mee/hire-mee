const faker = require('faker');
const db = require('./index.js')

//USERINFO DATA
const fakeUserInfoData = () => {
  let userInfo = {};
  userInfo.email = faker.internet.email().replace(/"/g, "'");
  userInfo.first_name = faker.name.first_name().replace(/"/g, "'");
  userInfo.last_name = faker.name.last_name().replace(/"/g, "'");
  userInfo.pass = faker.internet.password().replace(/"/g, "'");
  userInfo.applied_today = faker.random.number({'min': 1, 'max': 10});
  userInfo.applied_month = faker.random.number({'min': 1, 'max': 20});
  userInfo.app_onsite = faker.random.number({'min': 1, 'max': 8});
  userInfo.app_rejected = faker.random.number({'min': 1, 'max': 50});
  userInfo.app_no_response = faker.random.number({'min': 1, 'max': 100});
  userInfo.loc = `${faker.address.city().replace(/"/g, "'")}, ${faker.address.state().replace(/"/g, "'")}`;
  userInfo.job_title = faker.name.job_title().replace(/"/g, "'");
  userInfo.salary = faker.random.number({'min': 50000, 'max': 150000});
  userInfo.streak = faker.random.number({'min': 0, 'max': 12});
  userInfo.total_applied = faker.random.number({'min': 3, 'max': 20})
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

//USERINFO DATA

const insertFakeData = () => {
  userData.forEach((item) => {
    console.log('Data', item)
    let queryStr = `insert into user_info(email, first_name, last_name, pass, applied_today, applied_month, app_onsite, app_rejected, app_no_response, user_location, job_title, salary, streak, total_applied) values ('${item.email}', '${item.first_name}', '${item.last_name}', '${item.pass}', ${item.applied_today}, ${item.applied_month}, ${item.app_onsite}, ${item.app_rejected}, ${item.app_no_response}, '${item.loc}', '${item.job_title}', ${item.salary}, ${item.streak}, ${item.total_applied})`
    db.query(queryStr, (err) => {
      if(err) {console.log(err)}
      console.log("seeded into table user_info!")
    })
  })
}

// ---------> UNCOMMENT TO SEED DB <---------
// insertFakeData()



//APPLICATION DATA
const randomCategory = () => {
  let categories = ['Applied', 'On Site', 'Rejected', 'Offered', 'Light Cyan']
  return categories[Math.floor(Math.random() * categories.length)]
}

const randomColor= () => {
  let colors = ['Lavender Purple', 'Lumber', 'Jet Stream', 'Lemon Meringue', 'Nyanza']
  return colors[Math.floor(Math.random() * colors.length)]
}

const randomLocation = () => {
  let locations = ['Los Angeles, CA', 'Hollywood, CA', 'Santa Monica, CA', 'Montebello, CA', 'Burbank, CA', 'Pasadena, CA', 'Long Beach, CA', 'Irvine, CA']
  return locations[Math.floor(Math.random() * locations.length)]
}

const randomUrl = () => {
  let urls = ['https://indeedhi.re/2YhToBi', 'https://indeedhi.re/3cS2euA', 'https://indeedhi.re/3hngMGr', 'https://indeedhi.re/2MP8WXW', 'https://indeedhi.re/3cNRtd3', 'https://indeedhi.re/2Yl87LW', 'https://indeedhi.re/37uXWZr', 'https://indeedhi.re/3dWl7hu']
  return urls[Math.floor(Math.random() * urls.length)]
}

const randomDate = (start, end) => {
  var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const fakeApplicationData = () => {
  let applicationData = {};
  applicationData.userId = faker.random.number({'min': 0, 'max': 10});
  applicationData.category = randomCategory();
  applicationData.color = randomColor();
  applicationData.companyName = faker.company.companyName();
  applicationData.descr = faker.random.words();
  applicationData.loc = randomLocation();
  applicationData.positionTitle = faker.name.job_title();
  applicationData.salary = faker.random.number({'min': 50000, 'max': 150000});
  applicationData.submitDate = faker.date.between('2020-01-01', '2020-06-10').toLocaleString()
  applicationData.deadline = faker.date.between('2020-06-20', '2020-08-10').toLocaleString()
  applicationData.urlLink = randomUrl();

  return applicationData
}

const generateFakeApplications = () => {
  const fakeApps = []
  for(let i = 0; i < 100; i++){
    fakeApps.push(fakeApplicationData())
  }
  return fakeApps
}
const fakeApps = generateFakeApplications()

const insertFakeApps = () => {
  fakeApps.forEach((item) => {
    let queryStr = `insert into applications(userId, category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink) values (${item.userId}, '${item.category}', '${item.color}', '${item.companyName}', '${item.descr}', '${item.loc}', '${item.positionTitle}', ${item.salary}, '${item.submitDate}', '${item.deadline}', '${item.urlLink}')`
    db.query(queryStr, (err) => {
      if (err) {console.log(err)}
      console.log("seeded applications")
    })
  })
}

// ---------> UNCOMMENT TO SEED DB <---------
// insertFakeApps()