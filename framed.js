'use strict';

var Client = require('ifrau/client'),
	Promise = require('lie');

var REQUEST_KEY = require('./request-key');

module.exports = function getFramedJwt(scope) {
	return Promise
		.resolve()
		.then(function() {
			return new Client({
				resizeFrame: false,
				syncTitle: false,
				syncLang: false,
				syncFont: false
			}).connect();
		})
		.then(function(client) {
			return client.request(REQUEST_KEY, scope);
		});
};
