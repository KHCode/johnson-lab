require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const pgp = require("pg-promise")();
const cn = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    max: 30 // use up to 30 connections
};
const db = pgp(cn);

app.use(bodyParser.urlencoded({extended: true}));


module.exports.init_member_table = async function () {
    var members = helpers.getMembers();
    query = pgp.helpers.insert(members, ['name', 'image', 'title', 'current', 'credentials', 'bio', 'research_topic', 'research_url', 'current_job', 'current_job_url', 'osu_years'], 'member');
    console.log(query);
    await db.none(query);
}




