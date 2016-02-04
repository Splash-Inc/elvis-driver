'use strict'

var test = require('tape')
var Elvis = require('..')
var testConfig = require('./test_config')

function catchError(t) {
  return error => {
    console.log('error:', error)
    t.fail('An error occured.')
    t.end()
  }
}


test('Elvis createClient', t => {

  var client = Elvis.createClient(testConfig.server)

  t.equal(typeof client, 'object',
      'Create a client instance.')

  t.equal(client.elvisServerURL, testConfig.server,
      'Client instance has the correct server url.')

  t.false(client.sessionID,
      'Client instance has a sessionID which is not set yet.')

  t.end()

})


test('private getRemoteUrl', t => {

  var client = Elvis.createClient(testConfig.server)

  t.equal(
      client.__getRemoteURL('/some/path'),
      client.elvisServerURL + '/some/path',
      'Just concats path with server url, unless logged in')

  client
      .login(testConfig.username, testConfig.password)
      .then(() => {

        t.equal(
            client.__getRemoteURL('/foo/bar'),
            client.__withSessionID(
                client.elvisServerURL + '/foo/bar'),
            'Returns remote url with session id, after login')

        t.end()

      })
      .catch(catchError(t))

})


test('private hitWithSessionID', t => {

  var client = Elvis.createClient(testConfig.server)

  client
      .login(testConfig.username, testConfig.password)
      .then(() => {

        function checkMapping(hit1, hit2) {
          for (let key of Object.keys(hit1)) {
            if (typeof hit1[key] === 'string') {
              t.equal(
                  client.__withSessionID(hit1[key]),
                  hit2[key],
                  `maps ${key}`)

            } else if (typeof hit1[key] === 'object') {
              hit1[key].forEach((subField, index) => {
                checkMapping(subField, hit2[key][index])
              })
            }
          }
        }

        var sampleHit = {
          thumbnailUrl: 'lorem',
          previewUrl: 'ipsum',
          originalUrl: 'dolor',
          thumbnailHits: [
            {
              thumbnailUrl: 'sit',
              previewUrl: 'amet',
              originalUrl: 'adipiscing'
            }
          ]
        }

        var sampleHitWithSession = client.__hitWithSessionID(
            JSON.parse(JSON.stringify(sampleHit)))

        checkMapping(sampleHit, sampleHitWithSession)

        t.end()

      })
      .catch(catchError(t))

})


test('private request', t => {

  var client = Elvis.createClient(testConfig.server)

  client
      .login(testConfig.username, testConfig.password)
      .then(() => {

        client.__request({
          url: client.__getRemoteURL('/services/search'),
          params: { num: 0, q: '' },
          failure: catchError(t),
          success: data => {

            t.equal(typeof data, 'object',
                'Responded an object')

            t.deepEqual(data.totalHits, 0,
                'Responded empty array of results')

            t.end()

          }
        })

      })
      .catch(catchError(t))

})


test('private withSessionID', t => {

  var client = Elvis.createClient(testConfig.server)

  t.false(client.__withSessionID('/foo/bar'),
      'Returns null if not logged in')

  client
      .login(testConfig.username, testConfig.password)
      .then(() => {

        t.equal(
            client.__withSessionID('/foo/bar'),
            '/foo/bar;jsessionid=' + client.sessionID,
            'Appends ;jssessionid=<sessionid>')

        t.equal(
            client.__withSessionID('/foo/bar?lorem=baz'),
            '/foo/bar;jsessionid=' + client.sessionID + '?lorem=baz',
            'Inserts ;jssessionid=<sessionid> before any query string')

        t.end()

      })
      .catch(catchError(t))

})


test('public login', t => {

  var client = Elvis.createClient(testConfig.server)

  client
      .login(testConfig.username, testConfig.password)
      .then(data => {

        t.equal(typeof data, 'object',
            'Returns an object')

        t.equal(typeof data.sessionId, 'string',
            'Returns a session ID')

        t.end()

      })
      .catch(catchError(t))
})


test('public logout', t => {

  var client = Elvis.createClient(testConfig.server)

  client
      .login(testConfig.username, testConfig.password)
      .then(() => {

        client
            .logout()
            .then(() => {

              t.false(client.sessionID,
                  'Session ID of client has been removed')

              t.end()

            })
            .catch(catchError(t))

      })
      .catch(catchError(t))
})