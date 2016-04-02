var fs = require('fs')

module.exports = function (test, utils, Elvis, isBrowser) {

  'use strict'

  test('public update', t => {

    function updateWithMetadata(client) {
      return client
          // Create
          .create({ assetPath: _asset.path })
          // Update
          .then(file => client
              .update(file.id, { cf_follow: '+lorem' })
              // Search updated file
              .then(() => client
                  .search({ q: _asset.name })
                  .then(results => {

                    var updatedFile = results.hits.filter(hit => (
                        hit.id === file.id &&
                        hit.metadata.cf_follow.indexOf('lorem') > -1
                    ))[0]

                    t.assert(updatedFile, 'Updated file')

                    return client
                  })
              )
          )
    }


    function updateWithFiledata(client) {
      var Filedata
      if (isBrowser) {
        Filedata = new File([_assetWithData.content], _assetWithData.name, {type: 'text'})

      } else {
        fs.mkdirSync(_assetWithData.folder)

        fs.writeFileSync(
            `${_assetWithData.folder}/${_assetWithData.name}`,
            _assetWithData.content
        )
        Filedata = `${_assetWithData.folder}/${_assetWithData.name}`
      }

      return client
          // Create
          .create({ assetPath: _assetWithData.path })
          // Update
          .then(file => client
              .update(file.id, { Filedata })
              // Search updated file
              .then(() => client
                  .search({ q: _assetWithData.name })
                  .then(results => {

                    var updatedFile = results.hits.filter(hit => (
                        hit.id === file.id &&
                        hit.metadata.textContent === _assetWithData.content
                    ))[0]

                    t.assert(updatedFile, 'Updated file with file data')

                    return client
                  })
              )
          )

    }


    var timestamp = utils.getUniqueName()
    var _asset = {
      name: `foo-${timestamp}.txt`,
      path: `${utils.folderPath}/foo-${timestamp}.txt`
    }
    var _assetWithData = {
      name: `bar-${timestamp}.txt`,
      path: `${utils.folderPath}/bar-${timestamp}.txt`,
      folder: `${__dirname}/../dummy-folder-${timestamp}`,
      content: `Dummy bar-${timestamp}.txt contents`
    }

    utils
        .shouldRequireLogin(t, client => client.update(), Elvis)
        .then(updateWithMetadata)
        .then(updateWithFiledata)
        .then(() => {
          if (!isBrowser) {
            fs.unlinkSync(`${_assetWithData.folder}/${_assetWithData.name}`)
            fs.rmdirSync(_assetWithData.folder)
          }
          t.end()
        })
        .catch(utils.catchError(t))

  })

}