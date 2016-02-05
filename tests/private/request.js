module.exports = function (test, utils, Elvis) {

  'use strict'

  test('private request', t => {

    var client = Elvis.createClient(utils.server)

    client
        .login(utils.username, utils.password)
        .then(() => {

          client.__request({
            url: client.__getRemoteURL('/services/search'),
            params: { num: 0, q: '' },
            failure: utils.catchError(t),
            success: data => {

              t.equal(typeof data, 'object',
                  'Responded an object')

              t.deepEqual(data.totalHits, 0,
                  'Empty array of results received')

              t.end()

            }
          })

        })
        .catch(utils.catchError(t))
  })

}