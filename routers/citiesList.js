module.exports = function (req, res, next) {
	var cities = require('../libs/mongodb').cities();
	var text = req.body.text; 
	console.log(text);
	cities.find({city: {$regex: '^' + text, $options: ''}})
	.limit(10)
	.toArray(function(err, docs){
		if(err) return next(err);
		return res.json(docs);
	});
}