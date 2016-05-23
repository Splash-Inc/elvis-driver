'use strict'

var fs = require('fs')
var test = require('tape')
var utils = require('./test_utils')()
var Elvis = require('..')

utils.deleteAll(Elvis).then(() => {

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
        if (file.match(/.js$/)) {
          require(`${directory}/${file}`)(test, utils, Elvis)
        }
      }
    })
  })

})
