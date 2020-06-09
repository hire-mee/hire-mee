DROP DATABASE IF EXISTS hiremee;
CREATE DATABASE hiremee;

-- User
CREATE TABLE userinfo(
  -- LOGIN
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  --
  appliedToday INTEGER,
  -- darkMode BOOLEAN,   EXTRA CREDIT FOR SETTINGS
  loc VARCHAR(255),
  jobTitle VARCHAR(255),
  salary INTEGER,
  streak INTEGER,
  totalApplied INTEGER
);

-- APPLICATION PAGE
CREATE TABLE applications(
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES userinfo (id),
  category VARCHAR(255), -- Applied/On Site/ Rejected, Offered
  color VARCHAR(255),
  companyName VARCHAR(255),
  descr VARCHAR(255),
  loc VARCHAR(255),
  positionTitle VARCHAR(255),
  salary INTEGER,
  submitDate DATE,
  deadline DATE,
  urlLink VARCHAR(255)
);

-- FRIENDS LIST
CREATE TABLE friends(
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES userinfo (id)
);