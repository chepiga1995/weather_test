var getWeather = require('../libs/getWeather'); 
var async = require('async');

module.exports = function(req, res, next){
	var ids = req.body.ids;
	var results = [];
	// console.log(ids);
	async.eachSeries(ids, function(id, callback){
		getWeather(id, function(err, result){
			results.push(result);
			callback(err);
		});
	}, function(err){
		if(err) return next(err);
		res.json(results);
	});
	
}