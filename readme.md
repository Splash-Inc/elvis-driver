# Elvis Driver

[![Build Status]
(https://api.travis-ci.org/splash-elvis/elvis-driver.svg "Build Status")]
(https://travis-ci.org/splash-elvis/elvis-driver)
[![Coverage Status]
(https://coveralls.io/repos/github/splash-elvis/elvis-driver/badge.svg?branch=master)]
(https://coveralls.io/github/splash-elvis/elvis-driver?branch=master)
[![npm version](https://badge.fury.io/js/elvis-driver.svg "Npm Version")]
(https://badge.fury.io/js/elvis-driver)

Universal javascript driver for handling connections to Elvis API.

This module can be used in client-side as well as in server-side Node
(**≥5.2**).

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
var client = Elvis.createClient('serverAddress')
client.login('username', 'password').then(/*...*/)
```

## Documentation

See [Elvis' official API documentation]
(https://helpcenter.woodwing.com/hc/en-us/categories/200142445-Documentation-Elvis-5#APIs)

* * *

### browse(params) 

Browse folders and collections

**Parameters**

**params**: `Object`, Parameters object

**Returns**: `Promise`



* * *

### create(metadata) 

Create new asset

**Parameters**

**metadata**: `Object`, Metadata for asset

**Returns**: `Promise`



* * *

### createRelation(target1Id, target2Id, relationType) 

Create relation between two assets

**Parameters**

**target1Id**: `String`, ID of first asset

**target2Id**: `String`, ID of second asset

**relationType**: `String`, Type of relation e.g: 'related'

**Returns**: `Promise`



* * *

### getProfile() 

Get info of current user

**Returns**: `Promise`



* * *

### login(username, password) 

Login

**Parameters**

**username**: `String`, Username

**password**: `String`, Password

**Returns**: `Promise`



* * *

### logout() 

Invalidate current session

**Returns**: `Promise`



* * *

### remove(params) 

Remove asset

**Parameters**

**params**: `Object`, Parameters

**Returns**: `Promise`



* * *

### removeRelation(relationIds) 

Removes relation nodes

**Parameters**

**relationIds**: `Array | String`, List of relation ids

**Returns**: `Promise`



* * *

### search(params) 

Search

**Parameters**

**params**: `Object`, Search parameters

**Returns**: `Promise`



* * *

### update(metadata) 

Update asset

**Parameters**

**metadata**: `Object`, Update parameters

**Returns**: `Promise`



* * *

### updateBulk(params) 

Update multiple assets at once

**Parameters**

**params**: `Object`, Bulk update parameters

**Returns**: `Promise`



* * *










