var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("views", "./views"); // set it to folders names, different from the deafult 'views' name
app.set('view engine', 'jade'); //to remove .jade extension from routing response


app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended : true })); // register before it use

// app.use(function(req, res, next){
// 	console.log(`Incoming request: ${req.url}`);
// 	next();
// });


app.get('/', function handler(req, res){
	res.render("index",  {title: "Home"}, function  (error, html){
		console.log(html);
	});
});

var adminRouter = require('./admin');
app.use("/admin", adminRouter);

app.listen(3000, function(){
	console.log('Chat app listening the port 3000');
})