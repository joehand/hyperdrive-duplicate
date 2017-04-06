var assert = require('assert')
var fs = require('fs')
var streamEqual = require('stream-equal')

module.exports = function (archive, file, entry, cb) {
  assert.ok(archive, 'hyperdrive-duplicate: archive required')
  assert.equal(typeof file, 'string', 'hyperdrive-duplicate: file path required')
  if (typeof entry === 'function') {
    cb = entry
    entry = file
  }

  archive.stat(entry, function (err, stat) {
    if (err || !stat) return cb(null, false)
    fs.stat(file, function (err, fsStat) {
      if (err) return cb(err)
      if (fsStat.size !== stat.size) return cb(null, false)
      // TODO: Check mtimes?

      var fileStream = fs.createReadStream(file)
      var entryStream = archive.createReadStream(entry)
      streamEqual(fileStream, entryStream, cb)
    })
  })
}
