var test = require('tape')
var Elvis = require('..')
var testConfig = require('./test_config')


test('Elvis.createClient(serverUrl)', t => {

  var elvisAdapter = Elvis.createClient(testConfig.server)

  t.equal(typeof elvisAdapter, 'object',
      'Create a client instance.')

  t.equal(elvisAdapter.elvisServerURL, testConfig.server,
      'Client instance has the correct server url.')

  t.false(elvisAdapter.sessionID,
      'Client instance has a sessionID which is not set yet.')

  t.end()

})


test('elvisClient.login()', t => {

  var elvisAdapter = Elvis.createClient(testConfig.server)

  elvisAdapter
      .login(testConfig.username, testConfig.password)
      .then(data => {

        t.assert(data && data.sessionId,
            'Login returns an object with a sessionID.')

        t.end()

      })
      .catch(error => {
        console.log('login error:', error)
        t.fail('Couldn\'t log in')
        t.end()
      })
})


test('elvisClient.logout()', t => {

  var elvisAdapter = Elvis.createClient(testConfig.server)

  elvisAdapter
      .login(testConfig.username, testConfig.password)
      .then(() => {
        elvisAdapter
            .logout()
            .then(data => {
              t.assert(
                  typeof data === 'object' &&
                  data.errorcode === 401 &&
                  data.message === 'Not logged in',
                  'Logout returns a response body which has the correct code and message.')
              t.end()
            })
            .catch(error => {
              console.log('logout error:', error)
              t.fail('Couldn\'t log out')
              t.end()
            })
      })
})