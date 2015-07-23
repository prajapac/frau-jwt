'use strict';

import { Client } from 'ifrau';

export default async function getFramedJwt () {
	const client = new Client();

	await client.connect();

	const jwt = await client.request('newJwt');

	return jwt;
}
