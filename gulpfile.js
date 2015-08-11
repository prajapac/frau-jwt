'use strict';

var opts = {
	targetDirectory: 'frau-jwt',
	creds: {
		key: '***REMOVED***',
		secret: process.env.CDN_SECRET
	},
	version: process.env.TRAVIS_TAG
};

var gulp = require('gulp'),
	pg = require('peanut-gallery'),
	publisher = require('gulp-frau-publisher').lib(opts);

gulp.task('publish', function (cb) {
	gulp.src('./dist/host.js')
		.pipe(publisher.getStream())
		.on('end', function () {
			var message = '[frau-jwt/host available on the CDN]('
				+ publisher.getLocation() + 'host.js)';

			pg.comment(message, {}, function (error, response) {
				if (error) {
					return cb(JSON.stringify(error));
				}
				cb();
			});
		});
});
