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

            var tests = [
              client
                  .login({
                    username: utils.username,
                    password: utils.password
                  })
                  .then(data => {

                    t.equal(typeof data, 'object',
                        'Returns an object (non sticky)')

                    t.equal(typeof data.sessionId, 'string',
                        'Returns a session ID (non sticky)')

                  }),

              client
                .login({
                    username: utils.username,
                    password: utils.password
                }, true)
                .then(data => {

                    t.equal(typeof data, 'object',
                        'Returns an object (sticky)')

                    t.equal(typeof data.sessionId, 'string',
                        'Returns a session ID (sticky)')

                }),
              
              client
                .login({
                    withCookie: true
                }, true)
                .then(data => {
                    if (typeof document != 'undefined' && document.cookie && document.cookie.indexOf('JSESSIONID') != -1) {
                        t.pass('Should pass cookie is set')
                    } else {
                        t.fail('Should have failed cookie is unset')
                    }
                })
                .catch(data => {
                    if (typeof document == 'undefined' || !document.cookie || document.cookie.indexOf('JSESSIONID') == -1) {
                        t.pass('Should fail cookie is unset')
                    } else {
                        t.fail('Should have passed cookie is set')
                    }
                })
            ]

            Promise
                .all(tests)
                .then(() => {
                    t.end()
                })
                .catch(utils.catchError(t))
        })
  })

}