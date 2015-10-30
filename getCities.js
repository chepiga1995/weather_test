var MongoClient = require('mongodb').MongoClient;
var https = require('https');
var parseXml = require('xml2js').parseString;
var async = require('async');

var mongod = 'mongodb://localhost:27017/weather';
var url = 'https://pogoda.yandex.ru/static/cities.xml';

async.waterfall([connect, collection, getCities, parseString, findCountry], 
function(err, db){
	db.close();
	if(err)
		console.error("Something goes wrong\n" + err);
	else
		console.log('Successfully saved to data base');
});
function connect(callback){
	MongoClient.connect(mongod, callback)
}
function collection(db, callback){
	db.collection('cities').drop(function(err) {
		callback(null, db);
	});
}
function getCities(db, callback){
	var req = https.get(url, function(res) {
		console.log('request sent to: ' + url + '\nSTATUS: ' + res.statusCode);
		var bodyChunks = [];
		res.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			return callback(null, db, body);
		});
	});
	req.on('error', function(error){
		return callback(error, db);
	});
}
function parseString(db, body, callback){
	parseXml(body, function (err, result) {
		if(err){
			return callback(err, db);
		}

		return callback(null, db, result.cities.country);
	});
}
function findCountry(db, countries, callback){
	async.each(countries, function(country, inner_callback){
		findCity(db, country, inner_callback);
	},function(err){
		callback(err, db);
	});
}
function findCity(db, country, callback){
	async.each(country.city, function(city, inner_callback){
		var field = {
			_id: city.$.id,
			country: city.$.country,
			city: city._
		};
		saveToDb(db, field, inner_callback);
	}, function(err){
		callback(err);
	});
}
	
function saveToDb(db, field, callback){
	db.collection('cities').insert(field, function(err){
		callback(err);
	});
}