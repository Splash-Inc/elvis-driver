module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public search', t => {

    utils
        .shouldRequireLogin(t, client => client.search(), Elvis)
        .then(client => {

          var timestamp = utils.getUniqueName()
          var _asset = {
            name: `foo-${timestamp}.txt`,
            path: `${utils.folderPath}/foo-${timestamp}.txt`
          }

          // Create a file for searching for it later on
          client
              .create({ assetPath: _asset.path })
              .then(file => {

                // Search
                client
                    .search({ q: _asset.name })
                    .then(results => {

                      var foundFile = results.hits.filter(hit => (
                          hit.metadata.name === file.metadata.name &&
                          hit.metadata.id === file.metadata.id
                      ))[0]

                      t.assert(foundFile, 'Found newly created file ')

                      t.end()

                    })
                    .catch(utils.catchError(t))

              })
              .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))


  })


}