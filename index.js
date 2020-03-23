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

<<<<<<< HEAD
app.post("/contact", function(req, res){
	var name = req.body.name
  	var email = req.body.email
  	var message = req.body.message
  	var content = `name: ${name} \n email: ${email} \n message: ${message} `
	mail = {
		to: 'kristopher.hill@gmail.com',
		subject: 'New Message from Johnson Lab Online',
		body: content
	}
	
	transporter.sendMail(mail, function(err, data){
		if(err){
			console.log(err);
		    console.log(info.envelope);
    		console.log(info.messageId);
		}else{
			console.log("Email sent: " + info.response);
		}
	})
	console.log(req.body);
	res.redirect("/contact");
});

=======
>>>>>>> 4e4a991c7b6763e8a2f293b261a6acd15f020742
app.listen(3000, function(){
	console.log("Now serving Johnson Lab on the web!");
});