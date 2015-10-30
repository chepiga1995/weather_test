module.exports = function(app){
	app.get('/', function(req, res, next){
		res.type('html');  
		res.sendFile(__dirname.slice(0, -8) + '/public/html/index.html');   
	});
	app.post('getCities', require('./citiesList'));
}