'use strict';

import { default as getJwt } from './local';

import { REQUEST_KEY } from './framed';

export default function ifrauJwtHost (host) {
	host.onRequest(REQUEST_KEY, getJwt);
}
