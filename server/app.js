var sequelize = require('./db.js')

//the first variable, is importing the express module.
var express =require('express');
//then, it is calling express function in the app variable.
var app = express();
//this creates an instance of express that can be used to call
//various express functions that build a server

var bodyParser = require('body-parser');
var sequelize = require('./db');
var User = sequelize.import(__dirname + '\\models\\user');

//header request for middleware
app.use(require('./middleware/header'));

app.use("/api/test", function(req, res) {
	res.send("Hello World");
});


//this function starts the port open
app.listen(3000,function(){
		console.log("app is listening on 3000");
});

//data model, username & pass, model.table and 'user' represents the table	


User.sync();


//**THIS ({force:true}) DROPS THE USERS FROM THE DATABASE!***
//User.sync({force: true});
app.use(bodyParser.json());

