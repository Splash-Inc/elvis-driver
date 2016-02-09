module.exports = function (test, utils, Elvis) {

  'use strict'

  test('private hitWithSessionID', t => {

    var client = Elvis.createClient(utils.server)

    client
        .login({
          username: utils.username,
          password: utils.password
        })
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
        .catch(utils.catchError(t))
  })

}