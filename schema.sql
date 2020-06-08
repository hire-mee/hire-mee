DROP DATABASE IF EXISTS hiremee;
CREATE DATABASE hiremee;

CREATE TABLE userInfo(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  jobTitle VARCHAR(255),
  salary INTEGER,
  location VARCHAR(255),
  streak INTEGER
);

CREATE TABLE applications(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES userInfo (id),
  companyName VARCHAR(255),
  positionTitle VARCHAR(255),
  url VARCHAR(255),
  description VARCHAR(255),
  salary INTEGER,
  location VARCHAR(255),
  submittedDate DATE,
);

CREATE TABLE friends(
  id SERIAL PRIMARY KEY,
  userID INTEGER REFERENCES userInfo (id)
);