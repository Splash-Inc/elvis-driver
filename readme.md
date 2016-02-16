# Elvis Driver

[![Build Status]
(https://api.travis-ci.org/Splash-Inc/elvis-driver.svg "Build Status")]
(https://travis-ci.org/Splash-Inc/elvis-driver)
[![Coverage Status]
(https://coveralls.io/repos/github/Splash-Inc/elvis-driver/badge.svg?branch=master "Coverage Status")]
(https://coveralls.io/github/Splash-Inc/elvis-driver?branch=master)
[![Npm Version]
(https://badge.fury.io/js/elvis-driver.svg "Npm Version")]
(https://badge.fury.io/js/elvis-driver)
[![Dependency Status]
(https://david-dm.org/Splash-Inc/elvis-driver.svg "Dependency Status")]
(https://david-dm.org/Splash-Inc/elvis-driver)

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
client.login({
    username: 'test',
    password: '123456'
}).then(/*...*/)
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

### createFolder(path) 

Create new folder

**Parameters**

**path**: `Array | String`, Path for folder. If this option is supplied as
 array, multiple folders will be created with given paths.

**Returns**: `Promise`



* * *

### createRelation(target1Id, target2Id, relationType, metadata) 

Create relation between two assets

**Parameters**

**target1Id**: `String`, ID of first asset

**target2Id**: `String`, ID of second asset

**relationType**: `String`, Type of relation e.g: 'related'

**metadata**: `Object`, _[optional]_ Optional metadata fields to write to relation node

**Returns**: `Promise`



* * *

### getProfile() 

Get info of current user

**Returns**: `Promise`



* * *

### login(params, params.username, params.password, params.cred, params.nextUrl, params.failUrl, params.locale, params.timezoneOffset, params.clientType, params.returnProfile) 

Login

**Parameters**

**params**: `Object`, An object contains login parameters

**params.username**: `String`, _[optional]_ Either username and password or cred is required

**params.password**: `String`, _[optional]_ Either username and password or cred is required

**params.cred**: `String`, _[optional]_ A base64 string. Either username and password or cred is required

**params.nextUrl**: `String`, _[optional]_ Url for next page

**params.failUrl**: `String`, _[optional]_ Url for fail page

**params.locale**: `String`, _[optional]_ language_COUNTRY

**params.timezoneOffset**: `Number`, _[optional]_ Timezone offset in milliseconds

**params.clientType**: `string`, _[optional]_ Client type

**params.returnProfile**: `Boolean`, _[optional]_ Returns profile info if given `true`

**Returns**: `Promise`



* * *

### logout() 

Invalidate current session

**Returns**: `Promise`



* * *

### remove(options) 

Remove asset

**Parameters**

**options**: `Object`, An object contains one of these keys:
 `id`, `ids`, `q`, `folderPath` to find which assets/folders to remove

**Returns**: `Promise`



* * *

### removeRelation(relationIds) 

Removes relation nodes

**Parameters**

**relationIds**: `Array | String`, List of relation ids

**Returns**: `Promise`



* * *

### search(params, params.q, params.start, params.sort, params.metadataToReturn, params.facets, params.facet.&lt;field&gt;.selection, params.appendRequestSecret) 

Search assets

**Parameters**

**params**: `Object`, Search parameters

**params.q**: `String`, Query

**params.start**: `Number`, _[optional]_ Start after this number of results

**params.sort**: `String`, _[optional]_ Comma-delimited list of fields to sort on

**params.metadataToReturn**: `String`, _[optional]_ Comma-delimited list of metadata fields

**params.facets**: `String`, _[optional]_ Comma-delimited list of fields

**params.facet.&lt;field&gt;.selection**: `String`, _[optional]_ Comma-delimited list of values that should be `selected` for a given facet

**params.appendRequestSecret**: `Boolean`, _[optional]_ Return results with an encrypted code

**Returns**: `Promise`



* * *

### update(id, options, options.metadata, options.Filedata, options.nextUrl) 

Update asset

**Parameters**

**id**: `String`, ID of asset to update

**options**: `Object`, Update parameters

**options.metadata**: `Object`, _[optional]_ Either metadata or Filedata is required

**options.Filedata**: `File`, _[optional]_ Either metadata or Filedata is required

**options.nextUrl**: `String`, _[optional]_ 301 redirect on success

**Returns**: `Promise`



* * *

### updateBulk(params, params.q, params.metadata) 

Update multiple assets at once

**Parameters**

**params**: `Object`, Bulk update parameters

**params.q**: `String`, Query for selecting assets

**params.metadata**: `Object`, _[optional]_ Metadata object contains fields to update

**Returns**: `Promise`



* * *










