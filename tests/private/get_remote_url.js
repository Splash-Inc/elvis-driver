module.exports = function (test, utils, Elvis) {

  'use strict'

  test('private getRemoteUrl', t => {

    var client = Elvis.createClient(utils.server)

    t.equal(
        client.__getRemoteURL('/some/path'),
        client.elvisServerURL + '/some/path',
        'Just concats path with server url, unless logged in')

    client
        .login(utils.username, utils.password)
        .then(() => {

          t.equal(
              client.__getRemoteURL('/foo/bar'),
              client.__withSessionID(
                  client.elvisServerURL + '/foo/bar'),
              'Returns remote url with session id, after login')

          t.end()

        })
        .catch(utils.catchError(t))
  })

}