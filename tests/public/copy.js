module.exports = function (test, utils, Elvis) {
  'use strict'

  test('public copy', t => {
    utils.shouldRequireLogin(t, client => client.copy(), Elvis).then(client => {
      function copySingleAsset() {
        var uniqueKey = utils.getUniqueName()
        var assetName = `foo-${uniqueKey}.txt`
        var targetName = `foo-target-${uniqueKey}.txt`
        var assetPath = `${utils.folderPath}/${assetName}`
        var targetPath = `${utils.folderPath}/${targetName}`

        var createAsset = client.create({ assetPath })

        var copyAsset = createAsset.then(asset => client.copy({
          source: asset.metadata.assetPath,
          target: targetPath
        }))

        var searchTargetPath = copyAsset.then(() => client.search({
          q: targetPath
        }))

        return searchTargetPath.then(results => {
          t.equal(results.hits[0].metadata.assetPath, targetPath,
            'Copied single asset into destination')
        })
      }

      function copyFolder() {
        var folderUniqueKey = utils.getUniqueName()
        var folderPath = `${utils.folderPath}/foo-${folderUniqueKey}`
        var targetFolderPath = `${utils.folderPath}/foo-target-${folderUniqueKey}`
        var createFolder = client.createFolder(folderPath)

        var assetUniqueKey1 = utils.getUniqueName()
        var assetName1 = `foo-${assetUniqueKey1}.txt`
        var assetPath1 = `${folderPath}/${assetName1}`
        var createAsset1 = createFolder.then(() => client.create({ assetPath: assetPath1 }))

        var assetUniqueKey2 = utils.getUniqueName()
        var assetName2 = `foo-${assetUniqueKey2}.txt`
        var assetPath2 = `${folderPath}/${assetName2}`
        var createAsset2 = createAsset1.then(() => client.create({ assetPath: assetPath2 }))

        var copyFolder = createAsset2.then(() => client.copy({
          source: folderPath,
          target: targetFolderPath
        }))

        var searchTargetPath = copyFolder.then(() => client.search({
          q: targetFolderPath
        }))

        return searchTargetPath.then(results => {
          t.equal(results.hits.length, 2,
            'Copied 2 Assets in folder')

          var asset1 = results.hits.filter(asset => asset.metadata.assetPath.includes(assetName1))
          var asset2 = results.hits.filter(asset => asset.metadata.assetPath.includes(assetName2))

          t.true(asset1.length === 1 && asset2.length === 1,
            'Copied asset1 and asset2')

          var targetFolderPathMatching = results.hits.every(asset => (
            asset.metadata.assetPath.includes(targetFolderPath)
          ))

          t.true(targetFolderPathMatching,
            'Assets copied into correct destination')

          t.end()
        })
      }

      return copySingleAsset().then(copyFolder)

    }, utils.catchError(t))
  })

}
