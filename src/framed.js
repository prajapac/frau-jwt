'use strict';

var Client = require('ifrau/client'),
	Promise = require('lie');

var REQUEST_KEY = require('./request-key');

module.exports = function getFramedJwt(scope) {
	return Promise
		.resolve()
		.then(function() {
			var client = new Client({
				syncTitle: false
			});

			return client
				.connect()
				.then(function() {
					return client.request(REQUEST_KEY, scope);
				});
		});
};
