# frau-jwt

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][dependencies-image]][dependencies-url]

Simple utility to get a json web token in a D2L free range application
([frau](https://www.npmjs.com/browse/keyword/frau)).

## Install
```sh
npm install frau-jwt --save
```

## Usage
```js
var jwt = require('frau-jwt');

jwt('a:b:c')
	.then(function (token) {
		// do a thing with the token
	});

```

### API

---

#### `jwt([String scope])` -> `Promise<String>`

Requests a JWT with the given scope from the hosting LMS. If in an ifrau, the
request will be delegated to the frame host. The resulting token will be cached
until it expires.

##### Optional: scope

If _scope_ is provided, then it will be sent as the request scope of the token.
It should be a properly formatted String, with scopes seperated by spaces.
Defaults to `*:*:*`.

###### Examples

* `foo:bar:baz`
* `a:b:c x:y:z`

## Testing

```bash
npm test
```


## Contributing

1. **Fork** the repository. Committing directly against this repository is
   highly discouraged.

2. Make your modifications in a branch, updating and writing new unit tests
   as necessary in the `spec` directory.

3. Ensure that all tests pass with `npm test`

4. `rebase` your changes against master. *Do not merge*.

5. Submit a pull request to this repository. Wait for tests to run and someone
   to chime in.

## Triggering a Release

Releases occur based on the most recent commit message:
* Commits which contain `[increment patch]` will trigger a `patch` release. Example: `validate input before using [increment patch]`
* Commits which contain `[increment minor]` will trigger a `minor` release. Example: `add toggle() method [increment minor]`
* Commits which contain `[increment major]` will trigger a `major` release. Example: `breaking all the things [increment major]`

**Note:** When merging a pull request, this will be the merge commit message.

## Default Increment

If the most recent commit does not contain `[increment major|minor|patch]`, it will default to `[increment patch]`.

### Code Style

This repository is configured with [EditorConfig][EditorConfig] and
[ESLint][ESLint] rules.


[npm-url]: https://www.npmjs.org/package/frau-jwt
[npm-image]: https://img.shields.io/npm/v/frau-jwt.svg
[ci-url]: https://travis-ci.com/Brightspace/frau-jwt
[ci-image]: https://img.shields.io/travis/Brightspace/frau-jwt.svg
[dependencies-url]: https://david-dm.org/Brightspace/frau-jwt
[dependencies-image]: https://img.shields.io/david/Brightspace/frau-jwt.svg

[EditorConfig]: http://editorconfig.org/
[ESLint]: http://eslint.org
