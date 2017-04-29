/*jslint node: true */
"use strict";

var rp = require('request-promise');

var config = require('../config');
var utils = require('../helpers/tools');

var findArchiveById = function(id){
	var options = {
		uri: config['ARCHIVES_URL'] + id,
		// qs: {
		// 	access_token: 'xxxxx xxxxx'
		// },
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	};
	return new Promise(function(resolve, reject){
		rp(options)
			.then(function(response) {
				resolve(response);
			})
			.catch(function(response) {
				// utils.errorHandler(err);
				reject(response);
			});
	});
};

var createArticle = function(url){
	var options = {
		method: 'POST',
		uri: "http://www.plainview.io/articles",
		headers: {
			'User-Agent': 'Request-Promise'
		},
		body: {
			url: url
		},
		json: true
	};
	return new Promise(function(resolve, reject){
		rp(options)
			.then(function(response) {
				resolve(response);
			})
			.catch(function(response) {
				// utils.errorHandler(err);
				reject(response);
			});
	});
};

var createArticle = function(url, quote){
	var options = {
		method: 'POST',
		uri: "http://www.plainview.io/archives",
		headers: {
			'User-Agent': 'Request-Promise'
		},
		body: {
			url: url,
			quote: quote
		},
		json: true
	};
	return new Promise(function(resolve, reject){
		rp(options)
			.then(function(response) {
				resolve(response);
			})
			.catch(function(response) {
				// utils.errorHandler(err);
				reject(response);
			});
	});
};

module.exports = {
	findArchiveById: findArchiveById
};
