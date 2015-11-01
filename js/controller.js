var cities = require('./cities');
var modelCities = cities.modelCities;
var viewCities = cities.viewCities;

function ajaxCities (text, callback) {
	$.ajax({
		method: 'POST',
		url: 'getCities',
		data: {"text": text}
	}).done(function(cities){
		callback(null, cities);
	}).error(function(error){
		callback(error);
	});
}

function ajaxWeather (ids, callback) {
	$.ajax({
		method: 'POST',
		url: 'getWeather',
		data: {"ids": ids}
	}).done(function(weathers){
		callback(null, weathers);
	}).error(function(error){
		callback(error);
	});
}


var controller = {
	init: function(){
		controller.initCities();
	}
	initCities: function(){
		viewCities.offLiseners();
		modelCities.init();
		viewCities.init();
	},
	donetyping: function(){
		var text = viewCities.getText();
		if(!text){
			return controller.initCities();
		}
		ajaxCities(text, function(err, cities){
			if(err){
				return controller.initCities();
			} 
			viewCities.offLiseners();
			modelCities.setData(cities);
			var data = modelCities.getData();
			viewCities.render(data, controller.clickTip);
		});
	},
	clickTip: function(index){
		var id = modelCities.getId(index);
		ajaxWeather([id], function(err, arrWeather){
			controller.initCities();
			if(!err){
				console.log(arrWeather[0]);
			}
		});
	}
};

 

module.exports = controller;