if (typeof window !== 'undefined') {
  require('babel-polyfill')
}

var methods = {
  // Private
  __getRemoteURL:         require('./private/get_remote_url'),
  __hitWithSessionID:     require('./private/hit_with_session_id'),
  __request:              require('./private/request'),
  __withSessionID:        require('./private/with_session_id'),
  // Public
  alive:                  require('./public/alive'),
  browse:                 require('./public/browse'),
  create:                 require('./public/create'),
  createFolder:           require('./public/create_folder'),
  createRelation:         require('./public/create_relation'),
  getProfile:             require('./public/get_profile'),
  login:                  require('./public/login'),
  logout:                 require('./public/logout'),
  remove:                 require('./public/remove'),
  removeRelation:         require('./public/remove_relation'),
  search:                 require('./public/search'),
  update:                 require('./public/update'),
  updateBulk:             require('./public/update_bulk')
}

/**
 * @class Elvis
 * */
function Elvis(server) {
  this.elvisServerURL = server
  this.sessionID = null
  return this
}

Object.keys(methods).forEach(method => {
  Elvis.prototype[method] = methods[method]
})

module.exports = {
  createClient(server) {
    return new Elvis(server)
  }
}
