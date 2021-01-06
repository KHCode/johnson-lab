/*/////////////////////////////////
///Dependencies and Boilerplate///
///////////////////////////////*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const { pool } = require('./config');

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

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/people", async function(req, res, next){
	const client = await pool.connect()
    const result = await client.query('SELECT * FROM member')
    client.release()

    res.locals.members = result.rows;
	// res.send("No Errors, I guess?");
	let current_members = [];
    let former_members = [];
    for (let i = 0; i < res.locals.members.length; i++) {
        res.locals.members[i].current ? current_members.push(res.locals.members[i]) : former_members.push(res.locals.members[i]);
    }

    app.locals.current_members = current_members;
	app.locals.former_members = former_members;
	app.locals.lab_titles = ['Principle Investigator', 'Postdoctoral Researchers', 'Graduate Students', 'Undergraduate Students'];
	app.locals.former_types = ['Postdoctoral Researchers', 'Graduate Students', 'Undergraduate Students']

	res.render("people", {labTitles: app.locals.lab_titles, formerMember: app.locals.former_members, current: app.locals.current_members, formerTypes: app.locals.former_types});
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
