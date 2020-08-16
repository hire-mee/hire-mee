const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  // database: process.env.PG_DATABASE
  database: 'hiremee'
}

const proConfig = {
  connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);
// const pool = new Pool({
//   user: 'postgres',
//   port: 5432,
//   database: "hiremee"
// })

pool.connect()
  .then(console.log('Connectd to psql!'))
  .catch((err) => console.log(err));

module.exports = pool;