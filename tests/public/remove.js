module.exports = function (test, utils, Elvis) {

  test('public remove', t => {

    var timestamp = new Date().getTime()
    var _asset = {
      name: `foo-${timestamp}.txt`,
      path: `${utils.folderPath}/foo-${timestamp}.txt`
    }

    utils
        .shouldRequireLogin(t, client => client.remove())
        .then(client => {

          // Create file to remove later on
          client
              .create({ assetPath: _asset.path })
              .then(file => {

                client
                    .remove({ id: file.id })
                    .then(process => {

                      t.assert(process && process.processId,
                          'Returns an object with a processId')

                      client
                          .search({ q: _asset.name })
                          .then(results => {

                            var foundFile = results.hits.filter(hit => (
                                hit.metadata.name === file.metadata.name &&
                                hit.metadata.id === file.metadata.id
                            ))[0]

                            t.false(foundFile, 'Couldn\'t find newly removed file')

                          })

                      t.end()

                    })

              })

        })

  })

  'use strict'

}