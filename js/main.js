$(document).ready(function(){
	// alert($('body span').text());
	$('button').on('click', function(event){
		var text = $('.form-control').val();
		$.ajax({
			method: 'POST',
			url: 'getCities',
			data: {"text": text}
		}).done(function(msg){
			$('#text').text(msg.map(function(city){return city.city;}).join(';'))
		});
	});
});