'use strict';

var Client = require('./ifrau-client');

var REQUEST_KEY = require('./request-key');

module.exports = function getFramedJwt(scope) {
	return Client
		.then(function(client) {
			return new client().connect();
		})
		.then(function(connectedClient) {
			return connectedClient.request(REQUEST_KEY, scope);
		});
};
