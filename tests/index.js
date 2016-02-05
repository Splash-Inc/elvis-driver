'use strict'

var fs = require('fs')
var test = require('tape')
var utils = require('./test_utils')
var Elvis = require('..')

function deleteAll() {

  console.log('Deleting all files from remote')

  var client = Elvis.createClient(utils.server)
  return client
      .login(utils.username, utils.password)
      .then(() => {
        return client
            .search({ q: '' })
            .then(data => {
              var promises = data.hits.map(hit => (
                  client.remove({ id: hit.id })
              ))

              return Promise.all(promises)
            })
      })
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
        require(`${directory}/${file}`)(test, utils, Elvis)
      }
    })
  })

})