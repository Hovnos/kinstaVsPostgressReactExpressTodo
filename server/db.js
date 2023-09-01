const Pool = require('pg').Pool
require('dotenv').config() //hold sensitive info

/*const pool = new Pool({
    user:process.env.USERNAME,
    password: process.env.PASSWORD,
    host:process.env.HOST,
    port: process.env.DBPORT,
    database: "postgres"
})*/

const pool = new Pool({
    user:"postgres",
    password: "Sibir111",
    host:"localhost",
    port: 5432,
    database: "postgres"
})

module.exports = pool