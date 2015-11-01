var React = require('react');
var ReactDOM = require('react-dom');

var ArticleLeft = React.createClass({
	render: function () {
		return React.createElement(
			'div',
			{ className: 'left' },
			React.createElement(
				'div',
				{ className: 'img_temperature' },
				React.createElement('img', { src: this.props.url, title: this.props.data.weather_type }),
				React.createElement(
					'div',
					{ className: 'temperature' },
					React.createElement(
						'span',
						null,
						this.props.data.temperature
					),
					React.createElement(
						'span',
						{ className: 'meas' },
						'°C'
					)
				)
			)
		);
	}
});

var ArticleRight = React.createClass({
	render: function () {
		return React.createElement(
			'div',
			{ className: 'right' },
			React.createElement(
				'div',
				{ className: 'wind' },
				React.createElement('img', { src: this.props.url }),
				React.createElement(
					'span',
					{ className: 'left-data' },
					this.props.data.wind_speed
				),
				React.createElement(
					'span',
					{ className: 'measure' },
					'м/с'
				)
			),
			React.createElement(
				'div',
				{ className: 'pressure' },
				React.createElement('img', { src: 'img/icons/pressure.png' }),
				React.createElement(
					'span',
					{ className: 'left-data' },
					this.props.data.pressure
				),
				React.createElement(
					'span',
					{ className: 'measure' },
					'мм рт. ст.'
				)
			),
			React.createElement(
				'div',
				{ className: 'humidity' },
				React.createElement('img', { src: 'img/icons/humidity.png' }),
				React.createElement(
					'span',
					{ className: 'left-data' },
					this.props.data.humidity,
					'%'
				),
				React.createElement(
					'span',
					{ className: 'measure' },
					'влажн.'
				)
			)
		);
	}
});

var Article = React.createClass({
	render: function () {
		var inner = this.props.data.map(function (data) {
			var img_weather = 'img/weather_img/' + data.image + '.png';
			var img_wind = "img/icons/" + data.wind_direction + ".png";
			return [React.createElement('img', { className: 'close', src: 'img/close.svg' }), React.createElement(
				'h4',
				{ className: 'city_country' },
				data.city,
				', ',
				data.country
			), React.createElement('div', { className: 'clear' }), React.createElement(ArticleLeft, { data: data, url: img_weather }), React.createElement(ArticleRight, { data: data, url: img_wind })];
		});
		return React.createElement(
			'article',
			null,
			inner
		);
	}
});
function renderArtilces(Artilces) {
	ReactDOM.render(React.createElement(Article, { data: Artilces }), document.getElementById('inner'));
}

module.exports.renderArtilces = renderArtilces;