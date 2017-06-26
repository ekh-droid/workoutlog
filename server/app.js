//the first variable, is importing the express module.
var express =require('express');
//then, it is calling express function in the app variable.
var app = express();
//this creates an instance of express that can be used to call
//various express functions that build a server

var bodyParser = require('body-parser');

//header request for middleware
app.use(require('./middleware/header'));

app.use("/api/test", function(req, res) {
	res.send("Hello World");
});


//this function starts the port open
app.listen(3000,function(){
		console.log("app is listening on 3000");
});

//setting up a connection
var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'bandaid4', {
	host: 'localhost',
	dialect: 'postgres'

});

sequelize.authenticate().then(
		function() {
				console.log('connected to workoutlog postgres db');
			},
			function(err){
				console.log(err);
			}
);
//data model, username & pass, model.table and 'user' represents the table	

//a sequelize method, for the above user object.
var User = sequelize.define('user', {
			username: Sequelize.STRING,
			passwordhash: Sequelize.STRING

	});

User.sync();


//**THIS ({force:true}) DROPS THE USERS FROM THE DATABASE!***
//User.sync({force: true});
app.use(bodyParser.json());

app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;
	//need to create a user object and use sequelize to put that user itno

User.create({
		username: username,
		passwordhash: pass
}).then(

			function createSuccess(user){
				res.json({
						user: user,
						message:'u made an account pal'
				});
			},
			function createError(err){
					res.send(500, err.message);
			}
	);		
});