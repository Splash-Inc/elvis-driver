module.exports = function (test, utils, Elvis) {

  'use strict'

  test('private getRemoteUrl', t => {

    var client = Elvis.createClient(utils.server)

    t.equal(
        client.__getRemoteURL('/some/path'),
        client.elvisServerURL + '/some/path',
        'Just concats path with server url')

    t.end()
  })

}