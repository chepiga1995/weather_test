(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1]);
