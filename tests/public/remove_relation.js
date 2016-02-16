module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public removeRelation', t => {

    function _getRelatedAsset(hits, id1, id2) {
      return hits.filter(hit => (
          hit.id === id1 &&
          hit.relation.target1Id === id1 &&
          hit.relation.target2Id === id2
      ))[0]
    }

    utils
        .shouldRequireLogin(t, client => client.removeRelation())
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

          // Create assets to remove the relation between them later on
          Promise
              .all(_assets.map(asset => client.create({ assetPath: asset.path })))
              .then(assets => {

                var id1 = assets[0].id
                var id2 = assets[1].id

                // Create relation
                client
                    .createRelation(id1, id2, 'related')
                    .then(() => {

                      client
                          .search({ q: 'relatedTo:' + id2 })
                          .then(results => {

                            var relatedAsset = _getRelatedAsset(results.hits, id1, id2)
                            var relationId = relatedAsset.relation.relationId

                            // Remove relation
                            client.removeRelation(relationId)
                                .then(() => {

                                  client
                                      .search({ q: 'relatedTo:' + id2 })
                                      .then(results => {

                                        var foundRelatedAsset = _getRelatedAsset(results.hits, id1, id2)

                                        t.false(foundRelatedAsset, 'There should be no related asset')

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
              .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))

  })

}