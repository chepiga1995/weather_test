var cities = require('./cities');
var weather = require('./weather');
var modelCities = cities.modelCities;
var viewCities = cities.viewCities;
var viewWeather = weather.viewWeather;
var modelWeather = weather.modelWeather;

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
		this.initCities();
		this.initWeather();
	},
	initCities: function(){
		viewCities.offLiseners();
		modelCities.init();
		viewCities.init();
	},
	initWeather: function(){
		viewWeather.offLiseners();
		modelWeather.init();
		viewWeather.init();
		this.getWeatherFormCookie();
	},
	getWeatherFormCookie: function(){
		var cookies = modelWeather.getCookies();
		if(!cookies.length)
			return; 
		ajaxWeather(cookies, function(err, arrWeather){
			if(!err){
				modelWeather.setData(arrWeather);
				controller.renderWeather();
			}
		});
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
			controller.renderCities(cities);
		});
	},
	renderCities: function(cities){
		viewCities.offLiseners();
		modelCities.setData(cities);
		var data = modelCities.getData();
		viewCities.render(data, this.clickCity);
	},
	renderWeather: function(){
		viewWeather.offLiseners();
		var data = modelWeather.getData();
		viewWeather.render(data, this.removeWeather);
	},
	clickCity: function(index){
		var id = modelCities.getId(index);
		ajaxWeather([id], function(err, arrWeather){
			controller.initCities();
			if(!err){
				modelWeather.addArticle(arrWeather[0]);
				modelWeather.addCookie(arrWeather[0].id);
				controller.renderWeather();
			}
		});
	},
	removeWeather: function(index){
		modelWeather.removeArticle(index);
		modelWeather.removeCookie(index);
		if(modelWeather.isEmpty()){
			controller.initWeather(); 
		} else {
			controller.renderWeather();
		}
	}
};
 
module.exports = controller; 