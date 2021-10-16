const Pool = require("pg").Pool;
//This will connect our database named tasks locally on postgres

const pool = new Pool({
    database:"tasks",
    host:"localhost",
    port:5432,
    max:10,
    idleTimeoutMillis:30000
})
pool.on('connect', () => {
    console.log('Postgresql connected');
  });

pool.on('error', (err) => {
    console.log('Unexpected error on idle client', err);
    process.exit(-1);
});


module.exports = pool;