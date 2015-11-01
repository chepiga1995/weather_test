var render = require('./render');
var renderArtilces = render.renderArtilces;

var modelWeather = {
	_data: [],
	_cookies: [],
	init: function() {
		this._data = [];
		try{
			this._cookies = JSON.parse(Cookies.get('cities'));
		} catch(e){
			this._cookies = [];	
		}
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
		return this._data[index].id;
	},
	removeArticle: function(index){
		this._data.splice(index, 1);
	},
	addArticle: function(Article){
		this._data.push(Article);
	},
	addCookie: function(id){
		this._cookies.push(id);
		this._setCookies();
	},
	_setCookies: function(){
		var text = JSON.stringify(this._cookies);
		Cookies.set('cities', text, { expires: 30 });
	},
	removeCookie: function(index){
		this._cookies.splice(index, 1);
		this._setCookies();
	},
	getCookies: function(){
		return this._cookies;
	}
};  

var viewWeather = {
	init: function(){
		$('#inner').empty();
	},
	render: function(data, click){
		renderArtilces(data);
		var inner = $('#inner').find('article');
		inner.on('mouseenter', function(){
			$(this).find('.close').show();
		});
		inner.on('mouseleave', function(){
			$(this).find('.close').hide();
		});
		
		inner.find('.close').on('click', function(elem){
			var el = $(elem.target).parent();
			var index = inner.index(el);
			click(index);
		});
	},
	offLiseners: function(){
		var inner = $('#inner').find('article');
		inner.find('.close').off('click');
		inner.off('mouseenter');
		inner.off('mouseleave');
	} 
};

module.exports.viewWeather = viewWeather;
module.exports.modelWeather = modelWeather;