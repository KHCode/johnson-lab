/*/////////////////////////////////
///Dependencies and Boilerplate///
///////////////////////////////*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const { pool } = require('./config');
const { init_member_table } = require('./init');
const { get_all_members, split_members } = require('./database/dbHelpers');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

/*///////////////////////////////////
//Gathering Data.../////////////////
/////////////////////////////////*/

var labTitles = helpers.getLabTitles();
// pool.query('SELECT * FROM members', (err, res) => {
// 	// console.log(res.rows[0]);
// 	// console.log(res.rows[0].name);
// 	res.locals.members = res.rows;
// 	pool.end();
// });		//helpers.getMembers();
// console.log(res.locals.members);

var members = helpers.getMembers();
var papers = helpers.getPapers();
var years = helpers.getYears();

/*////////////////////////////////////
/////ROUTES//////////////////////////
//////////////////////////////////*/
// init_member_table();
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/people", get_all_members, split_members, function(req, res, next){
	res.send("No Errors, I guess?");
	console.log("Current Members:")
	console.log(res.locals.current_members)
	console.log("Former Members:")
	console.log(res.locals.former_members)
	//res.render("people", {labTitles: labTitles, former: former, member: member, formerMember: formerMember});
});

app.get("/papers", function(req, res){
	res.render("papers", {papers: papers, years: years});
});

app.get("/research", function(req, res){
	res.render("research");
});

app.get("/contact", function(req, res){
	res.render("contact");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
	console.log("Now serving Johnson Lab on the web!");
});
