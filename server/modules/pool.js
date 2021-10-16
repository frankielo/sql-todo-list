const Pool = require("pg").Pool;


const pool = new Pool({
    user:"franciscoblaslopez",
    host:"localhost",
    database:"weekend-to-do-app",
    password:"password",
    port:5432
})
pool.on('connect', () => {
    console.log('Postgresql connected');
  });

pool.on('error', (err) => {
    console.log('Unexpected error on idle client', err);
    process.exit(-1);
});


module.exports = pool;