//the first variable, is importing the express module.
var express =require('express');
//then, it is calling express function in the app variable.
var app = express();
//this creates an instance of express that can be used to call
//variou sexpress functions that build a server

//this function starts the port open
app.listen(3000,function(){
		console.log("app is listening on 3000");
});

