'use strict';

var framed = require('frau-framed');

module.exports = framed()
	? require('./framed')
	: require('./local');
