module.exports = function (test, utils, Elvis) {

  'use strict'

  test('private request', t => {

    var client = Elvis.createClient(utils.server)

    client.__request({
      url: client.__getRemoteURL('/services/search'),
      params: { q: '' },
      success() { t.end('Should fail when not logged in') },
      failure() {
        t.pass('Should fail when not logged in')

        client
            .login({
              username: utils.username,
              password: utils.password
            })
            .then(() => {

              client.__request({
                url: client.__getRemoteURL('/services/search'),
                params: { q: '' },
                failure: utils.catchError(t),
                success: data => {

                  t.equal(typeof data, 'object',
                      'Responded an object')

                  t.equal(typeof data.totalHits, 'number',
                      'Returned object has the totalHits field')

                  var timestamp = new Date().getTime()

                  client.__request({
                    url: client.__getRemoteURL(`/lorem/ipsum/${timestamp}`),
                    success() { t.end('Should fail with wrong url') },
                    failure() {
                      t.pass('Should fail with wrong url')
                      t.end()
                    }
                  })

                }
              })

            })
            .catch(utils.catchError(t))

      }
    })
  })

}