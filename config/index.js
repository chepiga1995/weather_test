var fs    = require('fs');
var nconf = require('nconf');

nconf.argv()
    .env();

var env = nconf.get('NODE_ENV');

nconf.file({ file: __dirname + '/package.json' });

if (env){
    nconf.set('NODE_ENV', env);
}

module.exports = nconf;