module.exports = function (test, utils, Elvis) {

  test('public updateBulk', t => {

    utils
        .shouldRequireLogin(t, client => client.updateBulk())
        .then(client => {

          var timestamp = new Date().getTime()
          var _assets = [
            {
              name: `foo-${timestamp}.txt`,
              path: `${utils.folderPath}/foo-${timestamp}.txt`
            },
            {
              name: `bar-${timestamp}.txt`,
              path: `${utils.folderPath}/bar-${timestamp}.txt`
            },
            {
              name: `bam-${timestamp}.txt`,
              path: `${utils.folderPath}/bam-${timestamp}.txt`
            }
          ]

          // Create 3 assets to bulk-update later on
          Promise
              .all(_assets.map(asset => client.create({ assetPath: asset.path })))
              .then(() => {

                // Bulk-update
                client
                    .updateBulk({
                      q: timestamp,
                      cf_follow: 'lorem'
                    })
                    .then(() => {

                      client
                          .search({ q: timestamp })
                          .then(results => {

                            var bulkUpdatedAssets = results.hits.filter(hit => (
                                hit.metadata.name.match(timestamp) &&
                                hit.metadata.cf_follow.indexOf('lorem') > -1
                            ))

                            t.equal(bulkUpdatedAssets.length, 3,
                                'There should be 3 bulk-updated assets')

                            _assets.forEach(asset => {
                              var bulkUpdatedAsset = bulkUpdatedAssets.filter(a => (
                                  a.metadata.name === asset.name
                              ))[0]

                              t.assert(bulkUpdatedAsset, 'Asset bulk-updated')
                            })

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