var hyperdrive = require('hyperdrive')
var memdb = require('memdb')
var raf = require('random-access-file')

var isDuplicate = require('.')

var drive = hyperdrive(memdb())
var archive = drive.createArchive({file: function (name) { return raf(name) }})

archive.append('example.js', function (err) {
  if (err) throw err
  isDuplicate(archive, 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: example.js is duplicate`)
  })
  isDuplicate(archive, 'example.js', 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: example.js is still duplicate`)
  })
  isDuplicate(archive, 'index.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not in archive so should be false`)
  })
  isDuplicate(archive, 'example.js', 'index.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not duplicate`)
  })
  isDuplicate(archive, 'index.js', 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not duplicate the other way around either. weird.`)
  })
})
