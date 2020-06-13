const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  port: 5432,
  database: "hiremee"
})

<<<<<<< HEAD
pool.connect()
.then(console.log('Connectd to psql!'))
.catch((err)=>console.log(err))


=======
pool.query('select now()', () => {
  console.log('Connected to psql!');
});
>>>>>>> 71086db919b0376423702c260495696115072198


module.exports = pool;