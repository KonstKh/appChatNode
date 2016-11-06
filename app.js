var express = require('express');
var app = express();
var rooms = require("./data/rooms.json");


app.set("views", "./views"); // set it to folders names, different from the deafult 'views' name
app.set('view engine', 'jade'); //to remove .jade extension from routing response


app.use(express.static("public"));
// app.use(express.static("public/admin"));
app.use(express.static("node_modules/bootstrap/dist"));


app.get('/', function handler(req, res){
	res.render("index",  {title: "Home"}, function  (error, html){
		console.log(html);
	});
});

app.get('/admin/rooms', function(req, res){
	res.render("rooms", {
		title: "Admin Rooms",
		rooms: rooms
	});
});

app.get('/hello', function(req, res){
	res.render("rooms",  {title: "Hello"});
});

app.listen(3000, function(){
	console.log('Chat app listening the port 3000');
})