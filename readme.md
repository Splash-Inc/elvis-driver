# Elvis DAM Javascript Driver

[![Build Status](https://api.travis-ci.org/Splash-Inc/elvis-driver.svg "Build Status")](https://travis-ci.org/Splash-Inc/elvis-driver)
[![Coverage Status](https://coveralls.io/repos/github/Splash-Inc/elvis-driver/badge.svg?branch=master "Coverage Status")](https://coveralls.io/github/Splash-Inc/elvis-driver?branch=master)
[![Npm Version](https://badge.fury.io/js/elvis-driver.svg "Npm Version")](https://badge.fury.io/js/elvis-driver)
[![Dependency Status](https://david-dm.org/Splash-Inc/elvis-driver.svg "Dependency Status")](https://david-dm.org/Splash-Inc/elvis-driver)

[https://splash-inc.github.io/elvis-driver](https://splash-inc.github.io/elvis-driver)

Universal javascript driver for handling connections to Elvis DAM API.

This module can be used in client-side as well as in server-side Node
(**≥4.0**).

## Setup

```
npm i -S elvis-driver
```

```js
// Node
var Elvis = require('elvis-driver')

// Browserify / Webpack
var Elvis = require('elvis-driver/browser')

// Create client instance
var client = Elvis.createClient('server-address')
client.login({
    username: 'test',
    password: '123456'
}).then(/*...*/)
```

## Documentation

[Documentation for elvis-driver](https://splash-inc.github.io/elvis-driver)

See also:
[Elvis' official API documentation](https://helpcenter.woodwing.com/hc/en-us/categories/200142445-Documentation-Elvis-5#APIs)