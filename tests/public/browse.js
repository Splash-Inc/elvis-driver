module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public browse', t => {

    utils
        .shouldRequireLogin(t, client => client.browse())
        .then(client => {

          var timestamp = new Date().getTime()
          var _collection = {
            name: `My Collection-${timestamp}`,
            assetPath: `${utils.folderPath}/My Collection-${timestamp}.collection`
          }

          // Create a collection to browse later on
          client
              .create({ assetPath: _collection.assetPath })
              .then(() => {

                // Browse
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

}