var request = require('superagent')
var _ = require('lodash')

if (typeof request.Request.prototype.fields === "undefined") {
  request.Request.prototype.fields = function(data) {
    if (!this._formData) {
      this._formData = new FormData()
    }

    if (typeof data === "object") {
      for (var key in data) {
        if (data.hasOwnProperty(key) && data[key]){
          this._formData.append(key, data[key])
        }
      }
    }

    return this
  }
}


function ElvisAdapter(configs) {
  this.elvisServerURL = configs.server
  this.sessionID = null
}

/**
 * Handle Hits
 * @param hit
 * @returns {*}
 * @private
 */
ElvisAdapter.prototype._hitWithSessionID = function(hit) {
  if (hit.thumbnailUrl)
    hit.thumbnailUrl = this._withSessionID(hit.thumbnailUrl)

  if (hit.previewUrl)
    hit.previewUrl = this._withSessionID(hit.previewUrl)

  if (hit.originalUrl)
    hit.originalUrl = this._withSessionID(hit.originalUrl)

  if (hit.thumbnailHits)
    hit.thumbnailHits.map(this._hitWithSessionID.bind(this))

  return hit
}

/**
 * Get Away URL
 * @param path
 * @returns {*}
 * @private
 */
ElvisAdapter.prototype._getRemoteURL = function(path) {
  var remoteURL = this.elvisServerURL + path

  if (this.sessionID) {
    return this._withSessionID(remoteURL)
  }

  return remoteURL
}

/**
 * Add Session ID
 * @param url
 * @returns {*}
 * @private
 */
ElvisAdapter.prototype._withSessionID = function(url) {
  if (!this.sessionID) {
    return null
  }

  var queryPoint = url.indexOf('?')
  var suffix = 'jsessionid=' + this.sessionID

  if (queryPoint === -1) {
    url += suffix

  } else {
    url = url.substr(0, queryPoint) + suffix + url.substr(queryPoint)
  }

  return url
}

/**
 * Request
 * @param payload
 * @private
 */
ElvisAdapter.prototype._request = function (payload) {
  request
      .post(payload.url)
      .withCredentials()
      .type('form')
      .send(payload.params)
      .end((err, res) => {
        if (err) {
          payload.failure.call(this, err)

        } else {
          var data = res.body
          if (data.errorcode) {
            if (data.errorcode === 401) {
              this.sessionID = null
              payload.failure.call(this, { loggedOut: true })
            } else {
              payload.failure.call(this, data)
            }
          } else {
            payload.success.call(this, data)
          }
        }
      })
}

/**
 * Login
 * @param username
 * @param password
 * @returns {Promise}
 */
ElvisAdapter.prototype.login = function(username, password) {
  var params = { cred: username + ':' + password }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/login'),
      params: params,
      success: data => {
        if (data.loginSuccess) {
          this.sessionID = data.sessionId
          resolve(data)
        } else {
          reject(data)
        }
      },
      failure: reject
    })
  })
}

/**
 * Logout
 * @returns {Promise}
 */
ElvisAdapter.prototype.logout = function() {
  return new Promise(resolve => {
    this.sessionID = null
    request
        .post(this._getRemoteURL('/services/logout'))
        .withCredentials()
        .end((err, res) => {
          if (err) {
            resolve(err)
          } else {
            var data = res.body
            resolve(data)
          }
        })

  })
}

/**
 * Get Profile
 * @returns {Promise}
 */
ElvisAdapter.prototype.getProfile = function() {
  if (!this.sessionID) {
    return Promise.reject('Session id required to get profile data.')
  }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/profile'),
      success: resolve,
      failure: reject
    })
  })
}

/**
 * Search
 * @param params
 * @returns {Promise}
 */
ElvisAdapter.prototype.search = function(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to search.')
  }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/search'),
      params: _.defaults(params, { num: 50, metadataToReturn: 'all' }),
      success: data => {
        if (data.hits) {
          data.hits.forEach(this._hitWithSessionID.bind(this))
        }
        resolve(data)
      },
      failure: reject
    })
  })
}

/**
 * Browse
 * @param params
 * @returns {Promise}
 */
ElvisAdapter.prototype.browse = function(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to browse.')
  }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/browse'),
      params: params,
      success: resolve,
      failure: reject
    })
  })
}

/**
 * Create
 * @param metadata
 * @returns {Promise}
 */
ElvisAdapter.prototype.create = function(metadata) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to create asset.')
  }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/create'),
      params: metadata,
      success: resolve,
      failure: reject
    })
  })
}

/**
 * Update
 * @param metadata
 * @returns {Promise}
 */
ElvisAdapter.prototype.update = function(metadata) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to update asset.')
  }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/update'),
      params: metadata,
      success: resolve,
      failure: reject
    })
  })
}

/**
 * Update Bulk
 * @param params
 * @returns {Promise}
 */
ElvisAdapter.prototype.updatebulk = function(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required to update asset.')
  }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/updatebulk'),
      params: params,
      success: resolve,
      failure: reject
    })
  })
}

/**
 * Delete Collection
 * @param params
 * @returns {Promise}
 */
ElvisAdapter.prototype.remove = function(params) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required')
  }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/remove'),
      params: { q: 'id:' + params.id, async: true },
      success: resolve,
      failure: reject
    })
  })
}

ElvisAdapter.prototype._removeRelation = function(relationIds) {
  if (!this.sessionID) {
    return Promise.reject('Authentication required')
  }

  return new Promise((resolve, reject) => {
    this._request({
      url: this._getRemoteURL('/services/removeRelation'),
      params: {
        relationIds: _.isArray(relationIds) ? relationIds.join(',') : relationIds
      },
      success: resolve,
      failure: reject
    })
  })
}

module.exports = ElvisAdapter