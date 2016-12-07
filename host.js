'use strict';

var getJwt = require('./local');

var REQUEST_KEY = require('./request-key');

module.exports = function ifrauJwtHost(host) {
	host.onRequest(REQUEST_KEY, getJwt);
};
