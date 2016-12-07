'use strict';

var framed = require('frau-framed');

var getFramed = require('./framed'),
	getLocal = require('./local');

module.exports = function frauJwt() {
	var fn = framed()
		? getFramed
		: getLocal;
	return fn.apply(fn, arguments);
};
