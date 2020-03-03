var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/people", function(req, res){
	res.render("people");
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
	console.log("Now serving Yelp Camp!");
});