module.exports = function (test, utils, Elvis) {

  'use strict'

  test('preview getPreviewUrl', t => {
    var client = Elvis.createClient(utils.server)

    t.equal(client.__getPreviewUrl('base'),
      'base',
      'Returns just base when no options passed')

    t.equal(client.__getPreviewUrl('base', 'txt'),
      'base',
      'Returns just base when no options passed but extension is passed')

    t.equal(client.__getPreviewUrl('base', null, { maxWidth: 256 }),
      'base',
      'Returns just base when no extension passed but options is passed')

    t.equal(client.__getPreviewUrl('base', 'txt', { lorem: 'ipsum' }),
      'base/previews/lorem_ipsum.txt',
      'Works correctly with one key')

    t.equal(client.__getPreviewUrl('base', 'tiff', { lorem: 'ipsum', foo: 'bar' }),
      'base/previews/lorem_ipsum_foo_bar.tiff',
      'Works correctly with more than one key')

    t.end()
  })

}
