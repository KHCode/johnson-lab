var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Member = require("./models/member");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function(req, res){
	res.render("landing");
});

var labTitles = ['Principle Investigator', 'Postdoctoral Researchers', 'Graduate Students', 'Undergraduate Students'];
var former = ['Postdoctoral Researchers', 'Graduate Students', 'Undergraduate Students'];
var Member = [
	{name: 'Dr. Colin Johnson',
	image: '/images/Johnson Base Final.jpg',
	title: 'Principle Investigator',
	current: true,
	credentials: 'Ph.D 2005 - University of Illinois, Urbana Champaign; Postdoc 2005-2007 - University of Pennsylvania; Postdoc 2007-2011 - University of Wisconsin, Madison',
	bio: 'Colin is a fan of running, comics, cycling, and beans.'},
	{name: 'Dr. Josephine Bonventre',
	image: '/images/bonventre1.jpg',
	title: 'Postdoctoral Researchers',
	current: true,
	credentials: 'This section is for credentials.',
	bio: 'This section is for a mini-bio.'},
	{name: 'Aayushi Manchanda',
	image: '/images/manchanda.jpg',
	title: 'Graduate Students',
	current: true,
	credentials: 'PhD. Candidate - Molecular & Cellular Biology',
	bio: 'Aayushi enjoys puppies and protein pull downs'},
	{name: 'Shauna Otto',
	image: '/images/otto1.jpg',
	title: 'Graduate Students',
	current: true,
	credentials: 'PhD. Candidate - Biochemistry & Biophysics',
	bio: 'Shauna enjoys crafting, karaoke, and membrane transport.'},
	{name: 'James Miyasaki',
	image: '/images/miyasaki.png',
	title: 'Graduate Students',
	current: true,
	credentials: 'Master\'s Student - Biochemistry & Biophysics',
	bio: 'This section is for a mini-bio.'},
	{name: 'Sabrina (Jou-Ying) Lin',
	image: '',
	title: 'Graduate Students',
	current: true,
	credentials: 'Master\'s Student - Biochemistry & Biophysics',
	bio: 'This section is for a mini-bio.'},
	{name: 'Tanushri Kumar',
	image: '/images/kumar.jpg',
	title: 'Undergraduate Students',
	current: true,
	credentials: 'Senior - Biochemistry & Molecular Biology',
	bio: 'This section is for a mini-bio.'},
	{name: 'Rebecca France',
	image: '/images/france.jpg',
	title: 'Undergraduate Students',
	current: true,
	credentials: 'Junior - Biochemistry & Molecular Biology',
	bio: 'This section is for a mini-bio.'},
	{name: 'Susmitha Matlapudi',
	image: '/images/matlapudi.png',
	title: 'Undergraduate Students',
	current: true,
	credentials: 'Senior - Microbiology',
	bio: 'This section is for a mini-bio.'},
	{name: 'Chapman Kuykendall',
	image: '/images/kuykendall.jpg',
	title: 'Undergraduate Students',
	current: true,
	credentials: 'Junior - Biochemistry & Molecular Biology',
	bio: 'Chapman is a junior BMB major originally from Phoenix, Oregon. He enjoys reading, hiking, cooking, and irritating his cat, Gato.'},
];
app.get("/people", function(req, res){
	res.render("people", {labTitles: labTitles, former: former, member: Member});
})

app.get("/papers", function(req, res){
	res.render("papers");
});

app.get("/research", function(req, res){
	res.render("research");
})

app.get("/contact", function(req, res){
	res.render("contact");
})
app.listen(3000, function(){
	console.log("Now serving Johnson Lab on the web!");
});