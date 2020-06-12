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
});


module.exports = pool;