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


// pool.query('SELECT * FROM members', (err, res) => {
// 	// console.log(res.rows[0]);
// 	// console.log(res.rows[0].name);
// 	app.locals.members = res.rows;
// 	pool.end();
// });		//helpers.getMembers();
// console.log(app.locals.members);

(async () => {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const queryString = 'SELECT * FROM member';
		const result = await client.query(queryString);
		result.rows.forEach(el => console.log(el));
		app.locals.members = result.rows;
		app.locals.members.forEach( el => {
			if(el.current){
				
			}
			
			switch (el.title){
				case('Principle Investigator'): 
					//save PI data separately
					break;
				case('Postdoctoral Researchers'):
					//create array of current post-doc members
					break;
				case('Graduate Students'):
					//create array of current grad/phd members
					break;
				case('Undergraduate Students'):
					//create array of current undergrad members
					break;
				case()
				//create array of former post-doc members
				//create array of former grad/phd members
				//create array of former undergrad members
			}
					
			console.log(el.name)
		});

		// const 
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK');
		throw e;
	} finally {
	  	client.release();
	}
})().catch(e => console.error(e.message, e.stack));



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
