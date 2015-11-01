var render = require('./render');
var renderArtilces = render.renderArtilces;
var renderTips = render.renderTips;
require('./jqueryExpend')(jQuery); 



$(document).ready(function(){
	// alert($('body span').text());

	// renderArtilces(Artilces);
	
	$('#search').donetyping(function(){
		var text = $('#search').val();

		if(!text){
			$('#inner_tips').empty();
			return;
		}
		$.ajax({
			method: 'POST',
			url: 'getCities',
			data: {"text": text}
		}).done(function(msg){
			renderTips(msg);
		});
	});
	// $('article').on('mouseenter', function(){
	// 	$(this).find('.close').show();
	// });
	// $('article').on('mouseleave', function(){
	// 	$(this).find('.close').hide();
	// });
	
	
});