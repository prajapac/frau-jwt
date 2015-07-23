'use strict';

import { default as getFramedJwt } from './framed';
import { default as getLocalJwt } from './local';

function framed () {
	return !window.D2L;
}

const fn = framed()
	? getFramedJwt
	: getLocalJwt;

export default function getJwt () {
	return fn.apply(this, arguments);
}
