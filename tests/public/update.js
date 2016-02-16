var fs = require('fs')

module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public update', t => {

    function updateWithMetadata(client) {
      // Create
      return client
          .create({ assetPath: _asset.path })
          .then(file => {

            // Update
            return client
                .update(file.id, {
                  cf_follow: '+lorem'
                })
                .then(() => {

                  // Search updated file
                  return client
                      .search({ q: _asset.name })
                      .then(results => {

                        var updatedFile = results.hits.filter(hit => (
                            hit.id === file.id &&
                            hit.metadata.cf_follow.indexOf('lorem') > -1
                        ))[0]

                        t.assert(updatedFile, 'Updated file')

                        return client

                      })
                      .catch(utils.catchError(t))

                })
                .catch(utils.catchError(t))

          })
          .catch(utils.catchError(t))
    }


    function updateWithFiledata(client) {
      fs.mkdirSync(_assetWithFiledata.folder)

      fs.writeFileSync(
          `${_assetWithFiledata.folder}/${_assetWithFiledata.name}`,
          _assetWithFiledata.content
      )

      // Create
      return client
          .create({ assetPath: _assetWithFiledata.path })
          .then(file => {

            // Update
            return client
                .update(file.id, {
                  Filedata: `${_assetWithFiledata.folder}/${_assetWithFiledata.name}`
                })
                .then(() => {

                  // Search updated file
                  return client
                      .search({ q: _assetWithFiledata.name })
                      .then(results => {

                        var updatedFile = results.hits.filter(hit => (
                            hit.id === file.id &&
                            hit.metadata.textContent === _assetWithFiledata.content
                        ))[0]

                        t.assert(updatedFile, 'Updated file with file data')

                        return client

                      })
                      .catch(utils.catchError(t))

                })
                .catch(utils.catchError(t))

          })
          .catch(utils.catchError(t))

    }


    var timestamp = utils.getUniqueName()
    var _asset = {
      name: `foo-${timestamp}.txt`,
      path: `${utils.folderPath}/foo-${timestamp}.txt`
    }
    var _assetWithFiledata ={
      name: `bar-${timestamp}.txt`,
      path: `${utils.folderPath}/bar-${timestamp}.txt`,
      folder: `${__dirname}/../dummy-folder-${timestamp}`,
      content: `Dummy bar-${timestamp}.txt contents`
    }

    utils
        .shouldRequireLogin(t, client => client.update())
        .then(updateWithMetadata)
        .then(updateWithFiledata)
        .then(() => {
          fs.unlinkSync(`${_assetWithFiledata.folder}/${_assetWithFiledata.name}`)
          fs.rmdirSync(_assetWithFiledata.folder)
          t.end()
        })
        .catch(utils.catchError(t))

  })

}