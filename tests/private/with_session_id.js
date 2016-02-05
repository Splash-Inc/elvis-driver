module.exports = function (test, utils, Elvis) {

  'use strict'

  test('private withSessionID', t => {

    var client = Elvis.createClient(utils.server)

    t.false(client.__withSessionID('/foo/bar'),
        'Returns null if not logged in')

    client
        .login(utils.username, utils.password)
        .then(() => {

          t.equal(
              client.__withSessionID('/foo/bar'),
              '/foo/bar;jsessionid=' + client.sessionID,
              'Appends ;jssessionid=<sessionid>')

          t.equal(
              client.__withSessionID('/foo/bar?lorem=baz'),
              '/foo/bar;jsessionid=' + client.sessionID + '?lorem=baz',
              'Inserts ;jssessionid=<sessionid> before any query string')

          t.end()

        })
        .catch(utils.catchError(t))
  })

}