const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD
}

const proConfig = { // uncomment for default production credentials!
  user: "postgres",
  database: "hiremee",
  password: "hiremee",
  port: 5432
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

pool.connect()
  .then(console.log('Connectd to psql database'))
  .catch((err) => console.log(err));

module.exports = pool;