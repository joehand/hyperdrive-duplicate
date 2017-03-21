var fs = require('fs')
var streamEqual = require('stream-equal')

module.exports = function (archive, file, entry, cb) {
  if (typeof entry === 'function') {
    cb = entry
    entry = file
  }
  archive.get(entry, function (err, st) {
    if (err && !st) return cb(null, false)
    var fileStream = fs.createReadStream(file)
    var entryStream = archive.createFileReadStream(st)
    streamEqual(fileStream, entryStream, cb)
  })
}
