'use strict';

import { Client } from 'ifrau';

export const REQUEST_KEY = 'newJwt';

export default async function getFramedJwt () {
	const client = new Client();

	await client.connect();

	const jwt = await client.request(REQUEST_KEY);

	return jwt;
}
