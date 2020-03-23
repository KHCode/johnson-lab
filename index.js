/*/////////////////////////////////
///Dependencies and Boilerplate///
///////////////////////////////*/

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var helpers = require("./helpers");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

/*///////////////////////////////////
//Gathering Data.../////////////////
/////////////////////////////////*/

var labTitles = helpers.getLabTitles();
var member = helpers.getMembers();
var former = helpers.getFormerTitles();
var formerMember = helpers.getFormerMembers();
var papers = helpers.getPapers();
var years = helpers.getYears();

/*////////////////////////////////////
/////ROUTES//////////////////////////
//////////////////////////////////*/

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/people", function(req, res){
	res.render("people", {labTitles: labTitles, former: former, member: member, formerMember: formerMember});
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
