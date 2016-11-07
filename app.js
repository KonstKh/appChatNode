var express = require('express');
var app = express();
var rooms = require("./data/rooms.json");
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var _ = require('lodash');

app.set("views", "./views"); // set it to folders names, different from the deafult 'views' name
app.set('view engine', 'jade'); //to remove .jade extension from routing response


app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended : true })); // register before it use

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

app.get('/admin/rooms/add', function(req, res){ // req: IncomingMessage, res: ServerResponse

	res.render("add");
});

// /admin/rooms/edit/f2754172-1c58-41ed-ae84-74e046888adb

app.get('/admin/rooms/edit/:id', function(req, res){
	var roomId = req.params.id;
	var room = _.find(rooms, r => r.id === roomId);
	if(!room){
		res.sendStatus(404);
		return;
	}

	res.render('edit', { room });
});

app.post('/admin/rooms/add', function(req, res){ // req: IncomingMessage, res: ServerResponse
	var room = {
		name: req.body.name,
		id: uuid.v4()
};
	rooms.push(room);
	// res.json(room);
	res.redirect('/admin/rooms');
});

app.post('/admin/rooms/edit/:id', function(req, res){ // req: IncomingMessage, res: ServerResponse
	var roomId = req.params.id;
	var room = _.find(rooms, r => r.id === roomId);
	if(!room){
		res.sendStatus(404);
		return;
	}
	room.name = req.body.name;
	res.redirect('/admin/rooms');
});


app.get('/hello', function(req, res){
	res.render("rooms",  {title: "Hello"});
});

app.get('/admin/rooms/delete/:id', function(req, res){
	var roomId = req.params.id;
	rooms = rooms.filter(r => r.id !== roomId);
	res.redirect('/admin/rooms');
});

app.listen(3000, function(){
	console.log('Chat app listening the port 3000');
})