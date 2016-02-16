module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public createRelation', t => {

    utils
        .shouldRequireLogin(t, client => client.createRelation())
        .then(client => {

          var timestamp = utils.getUniqueName()
          var _assets = [
            {
              name: `foo-${timestamp}.txt`,
              path: `${utils.folderPath}/foo-${timestamp}.txt`
            },
            {
              name: `bar-${timestamp}.txt`,
              path: `${utils.folderPath}/bar-${timestamp}.txt`
            }
          ]

          // Create assets to create relation between later on
          Promise
              .all(_assets.map(asset => client.create({ assetPath: asset.path })))
              .then(assets => {

                // Create relation
                client
                    .createRelation(assets[0].id, assets[1].id, 'related')
                    .then(() => {

                      client
                          .search({ q: 'relatedTo:' + assets[1].id })
                          .then(results => {

                            var foundRelatedAsset = results.hits.filter(hit => (
                                hit.id === assets[0].id &&
                                hit.relation.target1Id === assets[0].id &&
                                hit.relation.target2Id === assets[1].id &&
                                hit.relation.relationType === 'related'
                            ))[0]

                            t.assert(foundRelatedAsset, 'Found related asset')

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