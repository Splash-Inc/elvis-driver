module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public getProfile', t => {

    utils
        .shouldRequireLogin(t, client => client.getProfile())
        .then(client => {
          client
              .getProfile()
              .then(profile => {

                t.equal(profile.username, utils.username,
                    'Profile has the correct username')

                t.assert(Array.isArray(profile.authorities),
                    'Profile object contains list of authorities')

                t.assert(Array.isArray(profile.groups),
                    'Profile object contains list of groups')

                t.end()

              })
              .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))

  })

}