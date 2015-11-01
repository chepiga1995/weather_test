var render = require('./render');
var renderTips = render.renderTips;


var modelCities = {
	_data: [],
	init: function() {
		this._data = [];
	},
	getData: function(){
		return this._data;
	},
	setData: function(data){
		this._data = data;
	},
	isEmpty: function(){
		return this._data.length == 0;
	},
	getId: function(index){
		return this._data[index]._id;
	}
};  

var viewCities = {
	init: function(){
		$('#inner_tips').empty();
		$('#search').val(''); 
	},
	render: function(data, click){
		renderTips(data);
		var inner_li = $('#inner_tips').find('li');
		inner_li.on('click', function(elem){
			var el = $(elem.target);
			if(!el.find('span').length)
				el = el.parent();
			var index = inner_li.index(el);
			click(index);
		});
	},
	offLiseners: function(){
		$('#inner_tips').find('li').off('click');
	},  
	getText: function(){
		return $('#search').val();
	} 
};

module.exports.viewCities = viewCities;
module.exports.modelCities = modelCities;