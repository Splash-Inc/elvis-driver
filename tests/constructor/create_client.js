module.exports = function (test, utils, Elvis) {

  'use strict'

  test('Elvis createClient', t => {

    t.plan(3)

    var client = Elvis.createClient(utils.server)

    t.equal(typeof client, 'object',
        'Create a client instance.')

    t.equal(client.elvisServerURL, utils.server,
        'Client instance has the correct server url.')

    t.false(client.sessionID,
        'Client instance has a sessionID which is not set yet.')

  })

}