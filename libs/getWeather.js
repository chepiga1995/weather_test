var https = require('https');
var parseXml = require('xml2js').parseString;
var async = require('async');

var url = 'https://export.yandex.ru/weather-ng/forecasts/{{id}}.xml';

function getWeather(callback){
	var req = https.get(url, function(res) {
		console.log('request sent to: ' + url + '\nSTATUS: ' + res.statusCode);
		var bodyChunks = [];
		res.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			return callback(null, body);
		});
	});
	req.on('error', function(error){
		return callback(error);
	});
}
function parseString(body, callback){
	parseXml(body, function (err, result) {
		if(err || !result){
			return callback(new Error(err));
		}
		return callback(null, result.forecast.fact, result.forecast.$.city, result.forecast.$.country);
	});
}

function getInfo(fact, city, country, callback){
	var inform = {
		city: city,
		country: country,
		observation_time: fact[0].observation_time[0],
		temperature: fact[0].temperature[0]._,
		image: fact[0]['image-v3'][0]._,
		weather_type: fact[0].weather_type[0],
		wind_direction: fact[0].wind_direction[0],
		wind_speed: fact[0].wind_speed[0],
		pressure: fact[0].pressure[0]._,
		humidity: fact[0].humidity[0]
	}
	callback(null, inform);
}

module.exports = function (id, callback) {
	url = url.replace('{{id}}', id);
	async.waterfall([
		getWeather,
		parseString,
		getInfo
		], callback);
}