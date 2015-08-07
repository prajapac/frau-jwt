'use strict';

const request = require('superagent');

const TOKEN_ROUTE = '/d2l/lp/auth/oauth2/token';

export default function getLocalJwt () {
	return new Promise((resolve, reject) => {
		request
			.post(TOKEN_ROUTE)
			.end((err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res.body);
			});
	});
}
