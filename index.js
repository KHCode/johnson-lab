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

let labTitles = helpers.getLabTitles();
let members = helpers.getMembers();
let papers = helpers.getPapers();
let years = helpers.getYears();

app.locals.currentPostDocs = new Array();
app.locals.currentGrads = new Array();
app.locals.currentUndergrads = new Array();
app.locals.formerPostDocs = new Array();
app.locals.formerGrads = new Array();
app.locals.formerUndergrads = new Array();

pool.query('SELECT * FROM member', (err, res) => {
	if(err) {
		console.error(err.stack);
	} else {
		res.rows.forEach( el => {
			if(el.current){
				switch (el.title){
					case('Principle Investigator'): 
						app.locals.principleInvestigator = {...el};//save PI data separately
						break;
					case('Postdoctoral Researchers'):
						app.locals.currentPostDocs.push({...el});//create array of current post-doc members
						break;
					case('Graduate Students'):
						app.locals.currentGrads.push({...el});//create array of current grad/phd members
						break;
					case('Undergraduate Students'):
						app.locals.currentUndergrads.push({...el});//create array of current undergrad members
						break;
					default:
						break;
				}
			} else {
				switch(el.title){
					case('Postdoctoral Researchers'):
						app.locals.formerPostDocs.push({...el});//create array of former post-doc members
						break;
					case('Graduate Students'):
						app.locals.formerGrads.push({...el});//create array of former grad/phd members
						break;
					case('Undergraduate Students'):	
						app.locals.formerUndergrads.push({...el});//create array of former undergrad members
						break;
					default:
						break;
				}
				
			}
					
			// console.log(el.name);
		})
	}
})

/*////////////////////////////////////
/////ROUTES//////////////////////////
//////////////////////////////////*/

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/people", async function(req, res, next){
	// const client = await pool.connect()
    // const result = await client.query('SELECT * FROM member')
    // client.release()

    // res.locals.members = result.rows;
	// let current_members = [];
    // let former_members = [];
    // for (let i = 0; i < res.locals.members.length; i++) {
    //     res.locals.members[i].current ? current_members.push(res.locals.members[i]) : former_members.push(res.locals.members[i]);
    // }

    // app.locals.current_members = current_members;
	// app.locals.former_members = former_members;
	// app.locals.lab_titles = ['Principle Investigator', 'Postdoctoral Researchers', 'Graduate Students', 'Undergraduate Students'];
	// app.locals.former_types = ['Postdoctoral Researchers', 'Graduate Students', 'Undergraduate Students']

	res.render("people", {
			principleInvestigator: app.locals.principleInvestigator,
			currentPostDocs: app.locals.currentPostDocs, 
			currentGrads: app.locals.currentGrads, 
			currentUndergrads: app.locals.currentUndergrads, 
			formerPostDocs: app.locals.formerPostDocs,
			formerGrads: app.locals.formerGrads,
			formerUndergrads: app.locals.formerUndergrads,
			blankAvatar: '/images/blank-avatar.svg'
		});
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
