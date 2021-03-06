var methods = {
  // Private
  __isLoggedIn:               require('./private/is_logged_in'),
  __getPreviewUrl:            require('./private/get_preview_url'),
  __getRemoteURL:             require('./private/get_remote_url'),
  __hitWithSessionID:         require('./private/hit_with_session_id'),
  __setCookieHeader:          require('./private/set_cookie_header'),
  __loginWithBrowserCookie:   require('./private/login_with_browser_cookie'),
  __loginWithCSRF:            require('./private/login_with_csrf'),
  __request:                  require('./private/request'),
  __withSessionID:            require('./private/with_session_id'),
  // Public
  alive:                      require('./public/alive'),
  browse:                     require('./public/browse'),
  copy:                       require('./public/copy'),
  create:                     require('./public/create'),
  createFolder:               require('./public/create_folder'),
  createRelation:             require('./public/create_relation'),
  getProfile:                 require('./public/get_profile'),
  login:                      require('./public/login'),
  logout:                     require('./public/logout'),
  move:                       require('./public/move'),
  preview:                    require('./public/preview'),
  remove:                     require('./public/remove'),
  removeRelation:             require('./public/remove_relation'),
  search:                     require('./public/search'),
  update:                     require('./public/update'),
  updateBulk:                 require('./public/update_bulk'),
  setPermission:              require('./public/set_permission'),
  removePermission:           require('./public/remove_permission'),
  searchPermission:           require('./public/search_permission'),
  email:                      require('./public/email'),
  setRole:                    require('./public/set_role')
}

/**
 * @class Elvis
 * */
function Elvis(server) {
  this.elvisServerURL = server
  this.cookieHeader = null
  this.sessionID = null
  this.csrfToken = null
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
