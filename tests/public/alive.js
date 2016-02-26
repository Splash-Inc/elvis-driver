module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public browse', t => {

    utils
        .shouldRequireLogin(t, client => client.alive())
        .then(client => {

          client
              .alive()
              .then(response => {
                if (response) {
                  t.pass('Responded')
                  t.end()
                }
              })
              .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))
  })

}