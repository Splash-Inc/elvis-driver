var fs = require('fs')
var path = require('path')

module.exports = function (test, utils, Elvis, isBrowser) {

  'use strict'

  function createAndPreviewAsset(t, client, dummyAsset, cb) {
    function _createAndPreview() {
      client
        .create({
          assetPath: utils.folderPath + '/' + dummyAsset.name,
          Filedata: fileData || localFilePath
        })
        .then(file => {
          var extension = dummyAsset.extension
          var previewOptions = dummyAsset.options
          return client.preview(file.id, extension, previewOptions)
            .then(previewUrl => {
              t.assert(previewUrl.match(utils.server), 'Resolves the previewUrl')
              if (!isBrowser) {
                fs.unlinkSync(localFilePath)
                fs.rmdirSync(dummyAsset.folder)
                typeof cb === 'function' ? cb(file, previewUrl) : ''
              }
            })
        })
        .catch(e => console.error('Error', e))
    }

    var localFilePath = dummyAsset.folder + '/' + dummyAsset.name

    var fileData
    var stream
    if (isBrowser) {
      fileData = new File([dummyAsset.content || ''], dummyAsset.name, {type: dummyAsset.type})

    } else if (dummyAsset.content) {
      fs.mkdirSync(dummyAsset.folder)
      fs.writeFileSync(localFilePath, dummyAsset.content)

    } else if (dummyAsset.type.match(/image/)) {
      fs.mkdirSync(dummyAsset.folder)
      stream = fs.createReadStream(path.resolve(__dirname + '/../dummy-image.jpg'))
        .pipe(fs.createWriteStream(path.resolve(localFilePath)))
        .on('error', error => console.error(error))
    }

    if (stream) {
      stream.on('finish', () => {
        _createAndPreview()
      })
    } else {
      _createAndPreview()
    }
  }

  test('public preview', t => {

    utils.shouldRequireLogin(t, client => client.preview(), Elvis).then(client => {
      client.preview().catch(err => {
        if (/(assetID|assetPath)/.test(err)) {
          t.pass('Should require at least assetID or assetPath')
        }
      })

      var uniqueName1 = utils.getUniqueName()
      createAndPreviewAsset(t, client, {
        name: uniqueName1 + '.txt',
        folder: __dirname + '/../dummy-folder-' + uniqueName1,
        content: uniqueName1 + ' contents',
        type: 'text'
      }, (file1, previewUrl1) => {

        t.assert(previewUrl1.match(new RegExp('\/preview\/' + file1.id + '$')),
          'file.id is at the end of previewUrl when no options passed')

        var uniqueName2 = utils.getUniqueName()
        createAndPreviewAsset(t, client, {
          name: uniqueName2 + '.jpg',
          folder: __dirname + '/../dummy-folder-' + uniqueName2,
          type: 'image/jpg',
          extension: 'jpg',
          options: { maxWidth: 256 }
        }, (file2, previewUrl2) => {

          t.assert(previewUrl2.match(new RegExp('\/preview\/' + file2.id + '\/previews\/maxWidth_256.jpg$')),
            'When options and extension is passed, ' +
            'previewUrl is in /preview/id/previews/key_value.extension format')

          var uniqueName3 = utils.getUniqueName()
          createAndPreviewAsset(t, client, {
            name: uniqueName3 + '.png',
            folder: __dirname + '/../dummy-folder-' + uniqueName3,
            type: 'image/png',
            extension: 'png',
            options: { maxWidth: 512, scale: 50 }
          }, (file3, previewUrl3) => {

            t.assert(
              previewUrl3.match(
                new RegExp('\/preview\/' + file3.id + '\/previews\/maxWidth_512_scale_50.png$')),
              'Handles different extensions and multiple options')

            t.end()
          })
        })
      })
    })

  })

}
