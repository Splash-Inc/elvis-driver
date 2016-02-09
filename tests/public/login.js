module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public login', t => {

    var client = Elvis.createClient(utils.server)

    client
        .login({
          username: utils.username + 'abc',
          password: utils.password
        })
        .then(data => {

          t.end('Should fail with wrong username')

        })
        .catch(error => {

          t.pass('Should fail with wrong username')

          client
              .login({
                username: utils.username,
                password: utils.password
              })
              .then(data => {

                t.equal(typeof data, 'object',
                    'Returns an object')

                t.equal(typeof data.sessionId, 'string',
                    'Returns a session ID')

                t.end()

              })
              .catch(utils.catchError(t))

        })
  })

}