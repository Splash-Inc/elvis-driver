module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public login', t => {

    var client = Elvis.createClient(utils.server)

    client
        .login(utils.username, utils.password)
        .then(data => {

          t.equal(typeof data, 'object',
              'Returns an object')

          t.equal(typeof data.sessionId, 'string',
              'Returns a session ID')

          t.end()

        })
        .catch(utils.catchError(t))
  })

}