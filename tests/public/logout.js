module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public logout', t => {

    var client = Elvis.createClient(utils.server)

    client
        .logout()
        .then(data => { t.end('Shouldn\'t logout when not logged in') })
        .catch(() => {
          t.pass('Shouldn\'t logout when not logged in')

          client
              .login(utils.username, utils.password)
              .then(() => {

                client
                    .logout()
                    .then(() => {

                      t.false(client.sessionID,
                          'Session ID of client has been removed')

                      t.end()

                    })
                    .catch(utils.catchError(t))

              })
              .catch(utils.catchError(t))
        })
  })

}