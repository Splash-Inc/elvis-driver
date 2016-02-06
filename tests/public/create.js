module.exports = function (test, utils, Elvis) {

  'use strict'

  var timestamp = new Date().getTime()
  var _asset = {
    name: `foo-${timestamp}.txt`,
    path: `${utils.folderPath}/foo-${timestamp}.txt`
  }
  var _collection = {
    name: `My Collection-${timestamp}`,
    path: `${utils.folderPath}/My Collection-${timestamp}.collection`
  }

  test('public create', t => {

    var client = Elvis.createClient(utils.server)

    client
        .create({ assetPath: _asset.path })
        .then(data => { t.end('Authentication should be required') })
        .catch(error => {
          t.pass('Authentication should be required')
          client
              .login(utils.username, utils.password)
              .then(() => {

                Promise
                    .all([
                      // Create asset
                      client
                          .create({ assetPath: _asset.path })
                          .then(file => {

                            t.equal(file.metadata.name, _asset.name,
                                'name of file is correct')

                            t.equal(file.metadata.folderPath, utils.folderPath,
                                'folder of file is correct')

                            t.equal(file.metadata.assetType, 'txt',
                                'assetType of file is correct')

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

                        })

                    ])
                    .then(() => { t.end() })
                    .catch(utils.catchError(t))

              })
              .catch(utils.catchError(t))

        })

  })

}