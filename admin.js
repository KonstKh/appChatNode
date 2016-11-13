var rooms = require("./data/rooms.json");
var uuid = require('node-uuid');
var _ = require('lodash');
var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/rooms', function(req, res){
	res.render("rooms", {
		title: "Admin Rooms",
		rooms: rooms,
		baseUrlAdmin: req.baseUrl
	});
});

router.route('/rooms/add')
	.get(function(req, res){ // req: IncomingMessage, res: ServerResponse

		res.render("add");
	})
	.post(function(req, res){ // req: IncomingMessage, res: ServerResponse
		var room = {
			name: req.body.name,
			id: uuid.v4()
		};
		rooms.push(room);
		// res.json(room);
		res.redirect(req.baseUrl + '/rooms');
	});

router.route('/rooms/edit/:id')
	.get( function(req, res){
		var roomId = req.params.id;
		var room = _.find(rooms, r => r.id === roomId);
		if(!room){
			res.sendStatus(404);
			return;
		}
		res.render('edit', { room });
})
	.post(function(req, res){ // req: IncomingMessage, res: ServerResponse
		var roomId = req.params.id;
		var room = _.find(rooms, r => r.id === roomId);
		if(!room){
			res.sendStatus(404);
			return;
		}
		room.name = req.body.name;
		res.redirect(req.baseUrl  + '/rooms');
});


router.get('/hello', function(req, res){
	res.render("rooms",  {title: "Hello"});
});

router.get('/rooms/delete/:id', function(req, res){
	var roomId = req.params.id;
	rooms = rooms.filter(r => r.id !== roomId);
	res.redirect(req.baseUrl + '/rooms');
});