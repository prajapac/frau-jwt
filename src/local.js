'use strict';

const request = require('superagent');

export default function getLocalJwt () {
	return new Promise((resolve, reject) => {
		request
			.post('/d2l/lp/auth/oauth2/things')
			.end((err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res.body);
			});
	});
}
