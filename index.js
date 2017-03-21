var fs = require('fs')
var streamEqual = require('stream-equal')

module.exports = function (archive, file, entry, cb) {
  if (typeof entry === 'function') {
    cb = entry
    entry = file
  }
  archive.stat(entry, function (err, stat) {
    if (err || !stat) return cb(null, false)
    // TODO: compare fs.stat
    var fileStream = fs.createReadStream(file)
    var entryStream = archive.createReadStream(entry)
    streamEqual(fileStream, entryStream, cb)
  })
}
