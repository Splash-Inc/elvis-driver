'use strict'

var test = require('tape')
var utils = require('./test_utils')(true)
var Elvis = require('../browser')

utils.deleteAll(Elvis).then(() => {
  require('./constructor/create_client')(test, utils, Elvis)
  // * * *
  require('./private/hit_with_session_id')(test, utils, Elvis)
  require('./private/get_preview_url')(test, utils, Elvis)
  require('./private/get_remote_url')(test, utils, Elvis)
  require('./private/request')(test, utils, Elvis)
  require('./private/with_session_id')(test, utils, Elvis)
  // * * *
  require('./public/alive')(test, utils, Elvis)
  require('./public/browse')(test, utils, Elvis)
  require('./public/create')(test, utils, Elvis, true)
  require('./public/create_folder')(test, utils, Elvis)
  require('./public/create_relation')(test, utils, Elvis)
  require('./public/get_profile')(test, utils, Elvis)
  require('./public/login')(test, utils, Elvis)
  require('./public/logout')(test, utils, Elvis)
  require('./public/move')(test, utils, Elvis)
  require('./public/preview')(test, utils, Elvis, true)
  require('./public/remove')(test, utils, Elvis)
  require('./public/remove_relation')(test, utils, Elvis)
  require('./public/search')(test, utils, Elvis)
  require('./public/update')(test, utils, Elvis, true)
  require('./public/update_bulk')(test, utils, Elvis)
})
