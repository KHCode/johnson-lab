/*/////////////////////////////////
///Dependencies and Boilerplate///
///////////////////////////////*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const { pool } = require('./config');
const pgp = require("pg-promise");

app.use(bodyParser.urlencoded({extended: true}));

/*///////////////////////////////////
//Gathering Data.../////////////////
/////////////////////////////////*/

//var labTitles = helpers.getLabTitles();
// pool.query('SELECT * FROM members', (err, res) => {
// 	// console.log(res.rows[0]);
// 	// console.log(res.rows[0].name);
// 	res.locals.members = res.rows;
// 	pool.end();
// });		//helpers.getMembers();
// console.log(res.locals.members);

//var former = helpers.getFormerTitles();
var members = helpers.getMembers();
var formerMembers = helpers.getFormerMembers();
var papers = helpers.getPapers();
var years = helpers.getYears();


