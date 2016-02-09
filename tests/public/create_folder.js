module.exports = function (test, utils, Elvis) {

  function _createSingleFolder (t, client) {
    var name = `lorem-${utils.getUniqueName()}`
    var path = `${utils.folderPath}/${name}`

    return client
        .createFolder(path)
        .then(response => {

          t.equal(response[path], 'created', 'Responds properly')

          client
              .browse({ path: utils.folderPath })
              .then(folders => {

                var foundFolder = folders.filter(folder => (
                    folder.name === name &&
                    folder.assetPath === path &&
                    !!folder.directory
                ))[0]

                t.assert(foundFolder, 'Found newly created folder')

              })
              .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))
  }

  function _createMultipleFolders (t, client, quantity) {
    var folders = new Array(quantity)
        .join(' ')
        .split(' ')
        .map(() => {
          var name = `ipsum-${utils.getUniqueName()}`
          return { name, path: `${utils.folderPath}/${name}` }
        })

    return client
        .createFolder(folders.map(folder => folder.path))
        .then(response => {

          folders.forEach(folder => {
            t.equal(response[folder.path], 'created', 'Responds properly')
          })

          client
              .browse({ path: utils.folderPath })
              .then(results => {

                folders.forEach(folder => {
                  var foundFolder = results.filter(result => (
                      result.name === folder.name &&
                      result.assetPath === folder.path &&
                      !!result.directory
                  ))[0]

                  t.assert(foundFolder, 'Found multiply created folder')
                })

              })
              .catch(utils.catchError(t))

        })
        .catch(utils.catchError(t))
  }

  test('public createFolder', t => {

    utils
        .shouldRequireLogin(t, client => client.createFolder())
        .then((client) => {
          Promise
              .all([
                _createSingleFolder(t, client),
                _createMultipleFolders(t, client, 1),
                _createMultipleFolders(t, client, 3)
              ])
              .then(() => { t.end() })
              .catch(utils.catchError(t))
        })
        .catch(utils.catchError(t))

  })

}