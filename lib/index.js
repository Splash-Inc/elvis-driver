var methods = {
  // Private
  __setCookieHeader:      require('./private/set_cookie_header'),
  __isLoggedIn:           require('./private/is_logged_in'),
  __getRemoteURL:         require('./private/get_remote_url'),
  __hitWithSessionID:     require('./private/hit_with_session_id'),
  __withSessionID:        require('./private/with_session_id'),
  __request:              require('./private/request'),
  // Public
  alive:                  require('./public/alive'),
  browse:                 require('./public/browse'),
  create:                 require('./public/create'),
  createFolder:           require('./public/create_folder'),
  createRelation:         require('./public/create_relation'),
  getProfile:             require('./public/get_profile'),
  login:                  require('./public/login'),
  logout:                 require('./public/logout'),
  move:                   require('./public/move'),
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
  this.cookieHeader = null
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
