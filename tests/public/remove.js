module.exports = function (test, utils, Elvis) {

  test('public remove', t => {

    'use strict'

    function checkIfFound(client, q, metadata) {
      return client.search({ q }).then(results => {
        var foundFile = results.hits.filter(hit => (
            hit.metadata.name === metadata.name &&
            hit.metadata.id === metadata.id
        ))[0]

        t.false(foundFile, 'Shouldn\'t find newly removed file')
      })
    }

    function _remove(client, asset, async) {
      // Create file to remove later on
      var create = client.create({ assetPath: asset.path })

      var remove = create.then(file => client.remove({ id: file.id, async }).then(process => {

        if (async === false) {
          t.assert(process && process.processedCount === 1,
              'Returns an object with a processedCount field, that is 1')
        } else {
          t.assert(process && process.processId,
              'Returns an object with a processId')
        }

        return checkIfFound(client, asset.name, file.metadata)

      }))

      return remove
    }

    utils.shouldRequireLogin(t, client => client.remove(), Elvis).then(client => {
      var timestamp = utils.getUniqueName()
      var _asset = {
        name: `foo-${timestamp}.txt`,
        path: `${utils.folderPath}/foo-${timestamp}.txt`
      }

      var syncRemove = _remove(client, _asset, false)
      var asyncRemove1 = syncRemove.then(() => _remove(client, _asset, true))
      var asyncRemove2 = asyncRemove1.then(() => _remove(client, _asset))
      return asyncRemove2.then(() => t.end())

    }).catch(utils.catchError(t))

  })

}
