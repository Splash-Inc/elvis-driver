'use strict'

require('babel-polyfill')

var methods = {
  // Private
  __hitWithSessionID:     require('./private/hit_with_session_id'),
  __getRemoteURL:         require('./private/get_remote_url'),
  __withSessionID:        require('./private/with_session_id'),
  __request:              require('./private/request'),
  // Public
  login:                  require('./public/login'),
  logout:                 require('./public/logout'),
  getProfile:             require('./public/get_profile'),
  search:                 require('./public/search'),
  browse:                 require('./public/browse'),
  create:                 require('./public/create'),
  update:                 require('./public/update'),
  updateBulk:             require('./public/update_bulk'),
  remove:                 require('./public/remove'),
  createRelation:         require('./public/create_relation'),
  removeRelation:         require('./public/remove_relation')
}

function Elvis(server) {
  this.elvisServerURL = server
  this.sessionID = null
  return this
}

for (let method of Object.keys(methods)) {
  Elvis.prototype[method] = methods[method]
}

module.exports = {
  createClient(server) {
    return new Elvis(server)
  }
}