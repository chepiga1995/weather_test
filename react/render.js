var React = require('react');
var ReactDOM = require('react-dom');

var ArticleLeft = React.createClass({
	render: function(){
		return (
			<div className="left">
				<div className="img_temperature">
					<img src={this.props.url} title={this.props.data.weather_type}/>
					<div className="temperature">
						<span>{this.props.data.temperature}</span>
						<span className="meas">°C</span>
					</div>
				</div>	
			</div>
		);
	}
});

var ArticleRight = React.createClass({
	render: function(){
		return (
			<div className="right">
				<div className="wind">
					<img src={this.props.url}/>
					<span className="left-data">{this.props.data.wind_speed}</span>
					<span className="measure">м/с</span>
				</div>
				<div className="pressure">
					<img src="img/icons/pressure.png"/>
					<span className="left-data">{this.props.data.pressure}</span>
					<span className="measure">мм рт. ст.</span>
				</div>
				<div className="humidity">
					<img src="img/icons/humidity.png"/>
					<span className="left-data">{this.props.data.humidity}%</span>
					<span className="measure">влажн.</span>
				</div>
			</div>
		);
	}
});


var Article = React.createClass({
	render: function() {
		var inner = this.props.data.map(function(data){
			var img_weather = 'img/weather_img/' + data.image + '.png';
			var img_wind = "img/icons/" + data.wind_direction + ".png";
			return(
				<article>
					<img className="close" src="img/close.svg"/>
					<h4 className="city_country">{data.city}, {data.country}</h4>
					<div className="clear"></div>
					<ArticleLeft data={data} url={img_weather}/>
					<ArticleRight data={data} url={img_wind}/>
				</article>	
			);
		});
		return (
			<div>{inner}</div>
		);
	}
});

var Tips = React.createClass({
	render: function() {
		var inner = this.props.data.map(function(data){
			return(
				<li>{data.city}, {data.country}</li>
			);
		});
		return (
			<ul className="tips">{inner}</ul>
		);
	}
});

function renderArtilces (Artilces) {
	ReactDOM.render(<Article data = {Artilces}/>, document.getElementById('inner'));
}
function renderTips (tips) {
	ReactDOM.render(<Tips data = {tips}/>, document.getElementById('inner_tips'));
}

module.exports.renderArtilces = renderArtilces;
module.exports.renderTips = renderTips;
