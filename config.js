require('dotenv').config(); //dotenv is an npm module that looks for a .env file and saves them in the process.env object

const {Pool} = require('pg'); //we only need the Pool object from the pg module
const isProduction = process.env.NODE_ENV === 'production'; //Heroku has an environment variable called NODE_ENV that holds the value, 'production'
                                                            //this will only evaluate to True when running in Heroku
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

module.exports = {pool}