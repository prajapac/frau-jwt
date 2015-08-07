'use strict';

import { Client } from 'ifrau';

export const REQUEST_KEY = 'frau-jwt-newJwt';

export default function getFramedJwt () {
	return Promise
		.resolve()
		.then(function () {
			const client = new Client();

			return client
				.connect()
				.then(function () {
					return client.request(REQUEST_KEY);
				});
		});
}
