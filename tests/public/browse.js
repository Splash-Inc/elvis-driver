module.exports = function (test, utils, Elvis) {

  'use strict'

  var timestamp = new Date().getTime()
  var _collection = {
    name: `My Collection-${timestamp}`,
    assetPath: `${utils.folderPath}/My Collection-${timestamp}.collection`
  }

  test('public browse', t => {

    var client = Elvis.createClient(utils.server)

    client
        .browse({ folderPath: utils.folderPath })
        .then(data => { t.end('Authentication should be required') })
        .catch(error => {
          t.pass('Authentication should be required')

          client
              .login(utils.username, utils.password)
              .then(() => {

                client
                    .create({ assetPath: _collection.assetPath })
                    .then(() => {

                      client
                          .browse({ path: utils.folderPath })
                          .then(data => {

                            var foundCollection = data.filter(collection => (
                                collection.name === _collection.name &&
                                collection.assetPath === _collection.assetPath
                            ))[0]

                            t.assert(foundCollection, 'Found newly created collection')

                            t.end()
                          })
                          .catch(utils.catchError(t))
                    })
                    .catch(utils.catchError(t))

              })
              .catch(utils.catchError(t))

        })

  })

}