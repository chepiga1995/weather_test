// var render = require('./render');
// var renderArtilces = render.renderArtilces;
// var renderTips = render.renderTips;
require('./jqueryExpend')(jQuery); 
var controller = require('./controller');


$(document).ready(function(){
	controller.init();
	$('#search').donetyping(controller.donetyping);
});