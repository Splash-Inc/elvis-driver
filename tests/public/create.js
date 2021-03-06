var fs = require('fs')

module.exports = function (test, utils, Elvis, isBrowser) {

  'use strict'

  test('public create', t => {

    utils
        .shouldRequireLogin(t, client => client.create(), Elvis)
        .then(client => {

          var timestamp = utils.getUniqueName()
          var _asset = {
            name: `foo-${timestamp}.txt`,
            path: `${utils.folderPath}/foo-${timestamp}.txt`
          }
          var _collection = {
            name: `My Collection-${timestamp}`,
            path: `${utils.folderPath}/My Collection-${timestamp}.collection`
          }
          var _assetWithData = {
            name: `bar-${timestamp}.txt`,
            path: `${utils.folderPath}/bar-${timestamp}.txt`,
            folder: `${__dirname}/../dummy-folder-${timestamp}`,
            content: `Dummy bar-${timestamp}.txt contents`
          }
          var _nonExistentAsset = {
            name: `non-existent-file.txt`,
            path: `${utils.folderPath}/non-existent-file.txt`,
            folder: `non/existent/folder`,
            content: `Contents of non-existent-file.txt`
          }

          var fileData

          if (isBrowser) {
            fileData = new File([_assetWithData.content], _assetWithData.name, {type: 'text'})

          } else {
            fs.mkdirSync(_assetWithData.folder)

            fs.writeFileSync(
                `${_assetWithData.folder}/${_assetWithData.name}`,
                _assetWithData.content
            )
          }

          var tests = [

            // Create asset
            client
                .create({ assetPath: _asset.path })
                .then(file => {

                  t.equal(file.metadata.name, _asset.name,
                      'name of asset is correct')

                  t.equal(file.metadata.folderPath, utils.folderPath,
                      'folder of asset is correct')

                  t.equal(file.metadata.assetType, 'txt',
                      'assetType of asset is correct')

                }),

            // Create collection
            client
                .create({ assetPath: _collection.path })
                .then(collection => {

                  t.equal(collection.metadata.name, _collection.name,
                      'name of collection is correct')

                  t.equal(collection.metadata.folderPath, utils.folderPath,
                      'folder of collection is correct')

                  t.equal(collection.metadata.assetType, 'collection',
                      'assetType of collection is correct')

                }),

            // Create asset with filedata
            client
                .create({
                  assetPath: _assetWithData.path,
                  Filedata: fileData || `${_assetWithData.folder}/${_assetWithData.name}`
                })
                .then(file => {

                  t.equal(file.metadata.name, _assetWithData.name,
                      'name of assetWithFiledata is correct')

                  t.equal(file.metadata.folderPath, utils.folderPath,
                      'folder of assetWithFiledata is correct')

                  t.equal(file.metadata.assetType, 'txt',
                      'assetType of assetWithFiledata is correct')

                  t.equal(file.metadata.textContent, _assetWithData.content,
                      'content of assetWithFiledata is correct')

                })

          ]

          if (!isBrowser) {
            tests.push(
                // Try to create non-existent asset with filedata
                client
                    .create({
                      assetPath: _nonExistentAsset.path,
                      Filedata: `${_nonExistentAsset.folder}/${_nonExistentAsset.name}`
                    })
                    .then(() => {
                      t.fail('non-existent-file should throw ENOENT')
                    })
                    .catch(error => {
                      t.equal(error.code, 'ENOENT',
                          'non-existent-file should throw ENOENT')
                    })
            )
          }

          Promise
              .all(tests)
              .then(() => {
                if (!isBrowser) {
                  fs.unlinkSync(`${_assetWithData.folder}/${_assetWithData.name}`)
                  fs.rmdirSync(_assetWithData.folder)
                }
                t.end()
              })
              .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))

  })

}