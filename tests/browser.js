var test = require('tape')
var utils = require('./test_utils')(true)
var Elvis = require('../browser')

test('createClient', t => {
  Elvis.createClient(utils.server)
  t.pass('it\'s being loaded without errors')
  t.end()
})

test('login', t => {
  t.plan(2)
  var client = Elvis.createClient(utils.server)
  client
    .login({
      username: utils.username,
      password: utils.password
    })
    .then(d => {
      t.pass('Logged in with right credentials')
    })
    .catch(e => {
      t.fail(e)
    })

  client
    .login({
      username: 'wrong',
      password: 'credentials'
    })
    .then(d => {
      t.fail('Logged in with wrong credentials')
    })
    .catch(e => {
      t.pass('Couldn\'t logged in with wrong credentials')
    })
})