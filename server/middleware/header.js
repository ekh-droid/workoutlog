
//header created nodule file, a cross origin request connecting the server & client together
// the header written this way allows access by all origins (*)
module.exports = function(req, res, next){
	//the "*" allows any other origin to acess the site, 'wildcard'
	res.header("access-control-allow-origin","*");
	res.header('access-control-allow-methods','GET,POST,PUT, DELETE');
		res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		
	next();
};