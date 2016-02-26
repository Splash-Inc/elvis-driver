'use strict'

var fs = require('fs')
var test = require('tape')
var utils = require('./test_utils')
var Elvis = require('..')

function deleteAll() {
  console.log('Deleting all files from remote')
  var client = Elvis.createClient(utils.server)
  return client
      .login({
        username: utils.username,
        password: utils.password
      })
      .then(() => {
        return client
            .search({ q: '' })
            .then(data => {
              var assets = data.hits.map(hit => (
                  client.remove({ id: hit.id })
              ))

              return client
                  .browse({ path: utils.folderPath })
                  .then(results => {
                    var folders = results.map(result => (
                        client.remove({ folderPath: result.assetPath })
                    ))

                    return Promise.all(assets.concat(folders))

                  })
                  .catch(console.log)
            })
            .catch(console.log)
      })
      .catch(console.log)
}

deleteAll().then(() => {

  var directories = [
    __dirname + '/constructor',
    __dirname + '/private',
    __dirname + '/public'
  ]

  directories.forEach(directory => {
    fs.readdir(directory, (error, files) => {
      if (error) {
        throw error
      }
      for (let file of files) {
        if (file.match(/.js/)) {
          require(`${directory}/${file}`)(test, utils, Elvis)
        }
      }
    })
  })

})