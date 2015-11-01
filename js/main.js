require('./jqueryExpend')(jQuery); 
var controller = require('./controller');


$(document).ready(function(){
	controller.init();
	$('#search').donetyping(controller.donetyping);
});