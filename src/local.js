'use strict';

var Promise = require('lie'),
	request = require('superagent'),
	xsrfToken = require('frau-superagent-xsrf-token');

var DEFAULT_SCOPE = '*:*:*',
	TOKEN_ROUTE = '/d2l/lp/auth/oauth2/token';

module.exports = function getLocalJwt (scope) {
	return new Promise(function (resolve, reject) {
		scope = scope || DEFAULT_SCOPE;

		request
			.post(TOKEN_ROUTE)
			.type('form')
			.send({
				scope: scope
			})
			.use(xsrfToken)
			.end(function (err, res) {
				if (err) {
					return reject(err);
				}

				resolve(res.body);
			});
	});
};
