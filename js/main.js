// var render = require('./render');
// var renderArtilces = render.renderArtilces;
// var renderTips = render.renderTips;
require('./jqueryExpend')(jQuery); 
var controller = require('./controller');


$(document).ready(function(){
	// alert($('body span').text());

	// renderArtilces(Artilces);
	controller.init();
	$('#search').donetyping(controller.donetyping);
	// $('article').on('mouseenter', function(){
	// 	$(this).find('.close').show();
	// });
	// $('article').on('mouseleave', function(){
	// 	$(this).find('.close').hide();
	// });
	
	
});