DROP DATABASE IF EXISTS hiremee;
CREATE DATABASE hiremee;


DROP TABLE IF EXISTS user_info;

CREATE TABLE user_info(
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  salt VARCHAR(255),
  pass VARCHAR(255) NOT NULL,
  applied_today INTEGER,
  applied_month INTEGER,
  app_onsite INTEGER,
  app_rejected INTEGER,
  app_no_response INTEGER,
  user_location VARCHAR(255),
  job_title VARCHAR(255),
  salary INTEGER,
  streak INTEGER,
  total_applied INTEGER
);

DROP TABLE IF EXISTS applications;

CREATE TABLE applications(
  id SERIAL PRIMARY KEY,
  user_id BIGINT,
  category VARCHAR(255),
  color VARCHAR(255),
  company_name VARCHAR(255),
  app_description VARCHAR(255),
  app_location VARCHAR(255),
  position_title VARCHAR(255),
  salary INTEGER,
  submit_date VARCHAR(255),
  deadline VARCHAR(255),
  url_link VARCHAR(255)
);


DROP TABLE IF EXISTS friends;

CREATE TABLE friends(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES user_info (id)
);