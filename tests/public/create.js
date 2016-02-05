module.exports = function (test, utils, Elvis) {

  'use strict'

  test('public create', t => {

    var client = Elvis.createClient(utils.server)

    var assetPath = `${utils.folderPath}/foo.txt`

    client
        .create({ assetPath })
        .then(data => {
          t.fail('Authentication should be required')
        })
        .catch(error => {

          t.pass('Authentication should be required')

          client
              .login(utils.username, utils.password)
              .then(() => {

                client
                    .create({ assetPath })
                    .then(data => {

                      t.equal(data.metadata.name, 'foo.txt',
                          'name is correct')

                      t.equal(data.metadata.folderPath, utils.folderPath,
                          'folder is correct')

                      t.equal(data.metadata.assetType, 'txt',
                          'assetType is correct')

                      client
                          .remove({ id: data.metadata.id })
                          .then(() => { t.end() })

                    })
                    .catch(utils.catchError(t))

              })
              .catch(utils.catchError(t))

        })

  })

}