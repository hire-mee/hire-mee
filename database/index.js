const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '',
  host: 'localhost',
  port: 5432,
  database: "hiremee"
})

pool.query('select now()', () => {
  console.log('Connected to psql!');
  // pool.end();
});


module.exports = pool;