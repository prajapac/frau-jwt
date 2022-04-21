'use strict';

var clientPromise = require('./ifrau-client');

var REQUEST_KEY = require('./request-key');

module.exports = function getFramedJwt(scope, opts) {
	return clientPromise
		.then(function(Client) {
			return new Client().connect();
		})
		.then(function(client) {
			if (opts && opts.extendSession === false) {
				return client.request(REQUEST_KEY, scope, 'X-D2L-Session:no-keep-alive');
			}
			return client.request(REQUEST_KEY, scope);
		});
};
