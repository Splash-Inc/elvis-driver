# Elvis Driver
[![Build Status]
(https://api.travis-ci.org/splash-elvis/elvis-driver.svg "Build Status")]
(https://travis-ci.org/splash-elvis/elvis-driver)
[![npm version](https://badge.fury.io/js/elvis-driver.svg "Npm Version")]
(https://badge.fury.io/js/elvis-driver)

Universal javascript driver for handling connections to Elvis API.

This module can be used in client-side as well as in server-side Node
(**≥5.2**).

### Setup

```
npm i -S elvis-driver
```

```js
// Node
var Elvis = require('elvis-driver')

// Browserify / Webpack
var Elvis = require('elvis-driver/browser')

// Create client instance
var client = Elvis.createClient('serverAddress')
client.login('username', 'password').then(/*...*/)
```

### Documentation

See [Elvis' official API documentation]
(https://helpcenter.woodwing.com/hc/en-us/categories/200142445-Documentation-Elvis-5#APIs)

#### Methods

##### browse
_description to be added_

##### create
_description to be added_

##### getProfile
_description to be added_

##### login
_description to be added_

##### logout
_description to be added_

##### remove
_description to be added_

##### removeRelation
_description to be added_

##### search
_description to be added_

##### update
_description to be added_

##### updateBulk
_description to be added_
