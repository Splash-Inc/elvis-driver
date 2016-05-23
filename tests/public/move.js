
var fs = require('fs')

module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public move', t => {

    utils
        .shouldRequireLogin(t, client => client.move(), Elvis)
        .then(client => {

          var timestamp = utils.getUniqueName()
          var _asset = {
            name: `foo-to-be-moved-${timestamp}.txt`,
            rename: `foo-renamed-${timestamp}.txt`,
            path: `${utils.folderPath}/foo-to-be-moved-${timestamp}.txt`
          }

          var tests = [

            // Create asset
            client
              .create({ assetPath: _asset.path })
              .then(file => {
                
                // Move asset
                return client
                  .move({
                    source: file.metadata.assetPath,
                    target: `${file.metadata.folderPath}/${_asset.rename}`
                  })
                  .then(() => {

                    // Search for old asset
                    return client
                      .search({ q: _asset.name })
                      .then(results => {
                        var foundFile = results.hits.filter(hit => (
                            hit.metadata.name === _asset.name &&
                            hit.metadata.id === file.metadata.id
                        ))[0]

                        t.false(foundFile, 'Old file has gone')

                          return client
                            .search({ q: _asset.rename })
                            .then(results => {
                              var foundFile = results.hits.filter(hit => (
                                  hit.metadata.name === _asset.rename
                              ))[0]
                              t.assert(foundFile, 'Found relocated file')
                            })
                      })
                  })
              })

          ]

          Promise.all(tests).then(() => {
            t.end()
          })
          .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))

  })

}
