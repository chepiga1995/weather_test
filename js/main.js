var renderArtilces = require('./render').renderArtilces;

var Artilces = [
	{
		"city":"Москва",
		"country":"Россия",
		"id":"27612",
		"temperature":"-1",
		"image":"skc_n",
		"weather_type":"ясно",
		"wind_direction":"sw",
		"wind_speed":"4.0",
		"pressure":"758",
		"humidity":"85"
	}
];

$(document).ready(function(){
	// alert($('body span').text());

	renderArtilces(Artilces);
	$('article').on('mouseenter', function(e){
		$(this).find('.close').show();
	});
	$('article').on('mouseleave', function(e){
		$(this).find('.close').hide();
	});
	$('button').on('click', function(event){
		var text = $('.form-control').val();
		$.ajax({
			method: 'POST',
			url: 'getWeather',
			data: {"ids": [text]}
		}).done(function(msg){
			// msg.forEach(function(cities){
			// 	var elem = container;
			// 	for (i in cities) {
			// 		elem = elem.replace('{{' + i + '}}', cities[i]);
			// 	};
			// 	$("#inner").append(elem);
			// });
			$('article').on('mouseenter', function(e){
				$(e.target).find('.close').show();
			});
			$('article').on('mouseleave', function(e){
				$(e.target).find('.close').hide();
			});
		});
	});
	
});