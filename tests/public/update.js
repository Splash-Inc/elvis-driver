module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public update', t => {

    utils
        .shouldRequireLogin(t, client => client.update())
        .then(client => {

          var timestamp = utils.getUniqueName()
          var _asset = {
            name: `foo-${timestamp}.txt`,
            path: `${utils.folderPath}/foo-${timestamp}.txt`
          }

          // Create a file to update later on
          client
              .create({ assetPath: _asset.path })
              .then(file => {

                // Update
                client
                    .update(file.id, {
                      cf_follow: '+lorem'
                    })
                    .then(() => {

                      // Search updated file
                      client
                          .search({ q: _asset.name })
                          .then(results => {

                            var updatedFile = results.hits.filter(hit => (
                                hit.id === file.id &&
                                hit.metadata.cf_follow.indexOf('lorem') > -1
                            ))[0]

                            t.assert(updatedFile, 'Updated file')

                            t.end()

                          })
                          .catch(utils.catchError(t))

                    })
                    .catch(utils.catchError(t))

              })
              .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))

  })

}