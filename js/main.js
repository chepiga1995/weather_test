// var container = 

$(document).ready(function(){
	// alert($('body span').text());
	$('button').on('click', function(event){
		var text = $('.form-control').val();
		$.ajax({
			method: 'POST',
			url: 'getWeather',
			data: {"ids": [text]}
		}).done(function(msg){
			$('#text').text(msg.map(function(city){return JSON.stringify(city);}).join(';'))
		});
	});
	$('article').on('mouseenter', function(e){
		$(e.target).find('.close').show();
	});
	$('article').on('mouseleave', function(e){
		$(e.target).find('.close').hide();
	});
});