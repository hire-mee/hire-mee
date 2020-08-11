const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  port: 5432,
  database: "hiremee"
})

pool.connect()
  .then(console.log('Connectd to psql!'))
  .catch((err) => console.log(err));

module.exports = pool;