'use strict';

var Promise = require('lie'),
	request = require('superagent'),
	xsrfToken = require('frau-superagent-xsrf-token');

var TOKEN_ROUTE = '/d2l/lp/auth/oauth2/token';

module.exports = function getLocalJwt () {
	return new Promise(function (resolve, reject) {
		request
			.post(TOKEN_ROUTE)
			.use(xsrfToken)
			.end(function (err, res) {
				if (err) {
					return reject(err);
				}

				resolve(res.body);
			});
	});
};
