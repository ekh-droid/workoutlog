//the first variable, is importing the express module.
var express =require('express');
//then, it is calling express function in the app variable.
var app = express();
//this creates an instance of express that can be used to call
//various express functions that build a server


app.use('/api/test', function(req,res){
	res.send("Hello World");
});

//this function starts the port open
app.listen(3000,function(){
		console.log("app is listening on 3000");
});

