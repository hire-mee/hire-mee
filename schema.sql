DROP DATABASE IF EXISTS hiremee;
CREATE DATABASE hiremee;

-- User
CREATE TABLE userinfo(
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  salt VARCHAR(255),
  pass VARCHAR(255) NOT NULL,
  appliedToday INTEGER,
  appliedMonth INTEGER,
  appOnSite INTEGER,
  appRejected INTEGER,
  appNoResponse INTEGER,
  loc VARCHAR(255),
  jobTitle VARCHAR(255),
  salary INTEGER,
  streak INTEGER,
  totalApplied INTEGER
);

-- APPLICATION PAGE
CREATE TABLE applications(
  id SERIAL PRIMARY KEY,
  userId BIGINT,
  category VARCHAR(255), -- Applied/On Site/ Rejected, Offered
  color VARCHAR(255),
  companyName VARCHAR(255),
  descr VARCHAR(255),
  loc VARCHAR(255),
  positionTitle VARCHAR(255),
  salary INTEGER,
  submitDate VARCHAR(255),
  deadline VARCHAR(255),
  urlLink VARCHAR(255)
);

-- FRIENDS LIST
CREATE TABLE friends(
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES userinfo (id)
);