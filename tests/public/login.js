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
                        'Returns an object')

                    if (typeof data.sessionId != 'undefined' || typeof data.csrfToken != 'undefined') {
                        t.pass('Returns a token')
                    } else {
                        t.fail('Should have returned a token (either sessionId or csrfToken')
                    }

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