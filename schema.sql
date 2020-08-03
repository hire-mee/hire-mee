DROP DATABASE IF EXISTS hiremee;
CREATE DATABASE hiremee;


DROP TABLE IF EXISTS user_info;

CREATE TABLE user_info(
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255) NOT NULL, -- firstName
  last_name VARCHAR(255) NOT NULL, -- lastName
  salt VARCHAR(255),
  pass VARCHAR(255) NOT NULL,
  applied_today INTEGER, -- appliedToday
  applied_month INTEGER, -- appliedMonth
  app_onsite INTEGER, --appOnSite
  app_rejected INTEGER, -- appRejected
  app_no_response INTEGER, -- appNoResponse
  user_location VARCHAR(255), -- loc
  job_title VARCHAR(255), -- jobTitle
  salary INTEGER,
  streak INTEGER,
  total_applied INTEGER -- totalApplied
);

DROP TABLE IF EXISTS applications;

CREATE TABLE applications(
  id SERIAL PRIMARY KEY,
  user_id BIGINT, -- userId
  category VARCHAR(255),
  color VARCHAR(255),
  company_name VARCHAR(255), -- companyName
  app_description VARCHAR(255), -- descr
  app_location VARCHAR(255), --loc
  position_title VARCHAR(255), -- positionTitle
  salary INTEGER,
  submit_date VARCHAR(255), -- submitDate
  deadline VARCHAR(255),
  url_link VARCHAR(255) -- urlLink
);


DROP TABLE IF EXISTS friends;

CREATE TABLE friends(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_info (id) -- userId
);