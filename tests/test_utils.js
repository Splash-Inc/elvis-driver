module.exports = {

  server: '164.40.153.73',

  username: 'test',

  password: 'test',

  folderPath: '/Demo Zone/API TESTS',

  catchError(t) {
    return error => {
      console.log('error:', error)
      t.end('An error occured.')
    }
  }

}