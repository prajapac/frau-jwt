'use strict';

import framed from 'frau-framed';

import { default as getFramedJwt } from './framed';
import { default as getLocalJwt } from './local';

export { default as host } from './host';

const fn = framed()
	? getFramedJwt
	: getLocalJwt;

export default function getJwt () {
	return fn.apply(this, arguments);
}
