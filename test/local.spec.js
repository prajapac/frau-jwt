'use strict';

var expect = require('chai').expect,
	nock = require('nock'),
	Promise = require('lie'),
	sinon = require('sinon');

var TOKEN_ROUTE = '/d2l/lp/auth/oauth2/token';

var jwt = require('../src/local');

describe('local', function () {
	beforeEach(function () {
		sinon.stub(jwt, '_clock');
		jwt._clock.returns(0);
	});
	afterEach(function () {
		jwt._clock.restore();
		jwt._resetCaches();
	});

	it('should default to scope *:*:*', function () {
		var req = nock('http://localhost')
			.post(TOKEN_ROUTE, /scope=\*%3A\*%3A\*/)
			.reply(200, {
				expires_at: 1,
				access_token: 'foo-bar-baz'
			});

		return jwt().then(function () {
			req.done();
		});
	});

	it('should resolve with token the LMS returns', function () {
		var req = nock('http://localhost')
			.post(TOKEN_ROUTE)
			.reply(200, {
				expires_at: 1,
				access_token: 'foo-bar-baz'
			});

		return expect(jwt())
			.to.eventually.equal('foo-bar-baz')
			.then(function () {
				req.done();
			});
	});

	it('should dedupe concurrent requests for the same scope', function () {
		var req = nock('http://localhost')
			.post(TOKEN_ROUTE)
			.once()
			.reply(200, {
				expires_at: 1,
				access_token: 'foo-bar-baz'
			});

		return Promise
			.all([
				expect(jwt()).to.eventually.equal('foo-bar-baz'),
				expect(jwt()).to.eventually.equal('foo-bar-baz')
			])
			.then(function () {
				req.done();
			});
	});

	it('should not dedupe concurrent requests for different scopes', function () {
		var req = nock('http://localhost')
			.post(TOKEN_ROUTE, /scope=a%3Ab%3Ac/)
			.reply(200, {
				expires_at: 1,
				access_token: 'abc'
			})
			.post(TOKEN_ROUTE, /scope=x%3Ay%3Az/)
			.reply(200, {
				expires_at: 1,
				access_token: 'xyz'
			});

		return Promise
			.all([
				expect(jwt('a:b:c')).to.eventually.equal('abc'),
				expect(jwt('x:y:z')).to.eventually.equal('xyz')
			])
			.then(function () {
				req.done();
			});
	});

	it('should cache tokens per scope', function () {
		var req = nock('http://localhost')
			.post(TOKEN_ROUTE, /scope=a%3Ab%3Ac/)
			.once()
			.reply(200, {
				expires_at: 1,
				access_token: 'abc'
			})
			.post(TOKEN_ROUTE, /scope=x%3Ay%3Az/)
			.once()
			.reply(200, {
				expires_at: 1,
				access_token: 'xyz'
			});

		return Promise
			.all([
				expect(jwt('a:b:c')).to.eventually.equal('abc'),
				expect(jwt('x:y:z')).to.eventually.equal('xyz')
			])
			.then(function () {
				return Promise
					.all([
						expect(jwt('a:b:c')).to.eventually.equal('abc'),
						expect(jwt('x:y:z')).to.eventually.equal('xyz')
					]);
			})
			.then(function () {
				req.done();
			});
	});

	it('should re-fetch tokens after expiry', function () {
		var req = nock('http://localhost')
			.post(TOKEN_ROUTE, /scope=a%3Ab%3Ac/)
			.once()
			.reply(200, {
				expires_at: 1,
				access_token: 'abc'
			})
			.post(TOKEN_ROUTE, /scope=a%3Ab%3Ac/)
			.once()
			.reply(200, {
				expires_at: 3,
				access_token: 'abc'
			});

		return expect(jwt('a:b:c'))
			.to.eventually.equal('abc')
			.then(function () {
				jwt._clock.returns(2);
			})
			.then(function () {
				return expect(jwt('a:b:c')).to.eventually.equal('abc');
			})
			.then(function () {
				req.done();
			});
	});
});
