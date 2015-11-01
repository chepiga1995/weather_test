var express = require('express');
var app = express();
var config = require('./config');
var connect = require('./libs/mongodb').connect;
var async = require('async');
var server;
var downloadCities = require('./libs/getCities');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('env', config.get("NODE_ENV"));

app.use(require('morgan')('dev', {
    skip: function(){
        return app.get('env') != 'development';
    }
}));



app.use(express.static('public'));

app.use(require('cookie-parser')());

app.use(function(err, req, res, next){
	res.status(500).end("error!!");
});

require('./routers')(app);

async.series([downloadCities, function(callback){
 	connect(callback);
}, function(callback){
	var temp_server = app.listen(config.get('port'), config.get('host'), function(err){
		callback(err, temp_server);
	});
}], function(err, results){
	if(err){
		console.error("Fatal error");
		process.exit(1);
	} else {
		console.log("Server starts at http://" + config.get('host') + ":"
        + config.get('port') + " in " + app.get('env') + " mode.");
		server = results[0];
	}
});