var test = require('tape')
var Elvis = require('..')
var testConfig = require('./test_config')


test('Elvis createClient', t => {

  var elvisAdapter = Elvis.createClient(testConfig.server)

  t.equal(typeof elvisAdapter, 'object',
      'Create a client instance.')

  t.equal(elvisAdapter.elvisServerURL, testConfig.server,
      'Client instance has the correct server url.')

  t.false(elvisAdapter.sessionID,
      'Client instance has a sessionID which is not set yet.')

  t.end()

})


test('private getRemoteUrl', t => {

  var elvisAdapter = Elvis.createClient(testConfig.server)

  t.equal(
      elvisAdapter.__getRemoteURL('/some/path'),
      elvisAdapter.elvisServerURL + '/some/path',
      'Just concats path with server url, unless logged in')

  elvisAdapter
      .login(testConfig.username, testConfig.password)
      .then(() => {

        t.equal(
            elvisAdapter.__getRemoteURL('/foo/bar'),
            elvisAdapter.__withSessionID(
                elvisAdapter.elvisServerURL + '/foo/bar'),
            'Returns remote url with session id, after login')

        t.end()

      })

})


test('private withSessionID', t => {

  var elvisAdapter = Elvis.createClient(testConfig.server)

  t.false(elvisAdapter.__withSessionID('/foo/bar'),
      'Returns null if not logged in')

  elvisAdapter
      .login(testConfig.username, testConfig.password)
      .then(() => {

        t.equal(
            elvisAdapter.__withSessionID('/foo/bar'),
            '/foo/bar;jsessionid=' + elvisAdapter.sessionID,
            'Appends ;jssessionid=<sessionid>')

        t.equal(
            elvisAdapter.__withSessionID('/foo/bar?lorem=baz'),
            '/foo/bar;jsessionid=' + elvisAdapter.sessionID + '?lorem=baz',
            'Inserts ;jssessionid=<sessionid> before any query string')

        t.end()

      })

})


test('public login', t => {

  var elvisAdapter = Elvis.createClient(testConfig.server)

  elvisAdapter
      .login(testConfig.username, testConfig.password)
      .then(data => {

        t.equal(typeof data, 'object',
            'Returns an object')

        t.equal(typeof data.sessionId, 'string',
            'Returns a session ID')

        t.end()

      })
      .catch(error => {
        console.log('login error:', error)
        t.fail('Couldn\'t log in')
        t.end()
      })
})


test('public logout', t => {

  var elvisAdapter = Elvis.createClient(testConfig.server)

  elvisAdapter
      .login(testConfig.username, testConfig.password)
      .then(() => {

        elvisAdapter
            .logout()
            .then(() => {

              t.false(elvisAdapter.sessionID,
                  'Session ID of client has been removed')

              t.end()

            })
            .catch(error => {
              console.log('logout error:', error)
              t.fail('Couldn\'t log out')
              t.end()
            })

      })
})