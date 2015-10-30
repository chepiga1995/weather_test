var mongod = 'mongodb://localhost:27017/weather';
var MongoClient = require('mongodb').MongoClient;
var db;
function connect(callback) {
	MongoClient.connect(mongod, function(err, d_b) {
		db = d_b;
		callback(err);
	});	
}

exports.connect = connect;
exports.cities = function(){
	return db.collection('cities');
}
