var fs = require('fs')
var test = require('tape')
var hyperdrive = require('hyperdrive')
var ram = require('random-access-memory')

var isDuplicate = require('.')

test('duplicate with same name', function (t) {
  var archive = hyperdrive(ram)
  archive.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isDuplicate(archive, 'example.js', function (err, duplicate) {
      t.ifError(err)
      t.ok(duplicate, 'example.js is duplicate')
      t.end()
    })
  })
})

test('duplicate with different name', function (t) {
  var archive = hyperdrive(ram)
  archive.writeFile('different.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isDuplicate(archive, 'example.js', 'different.js', function (err, duplicate) {
      t.ifError(err)
      t.ok(duplicate, 'example.js is duplicate of different.js')
      t.end()
    })
  })
})

test('file not in archive', function (t) {
  var archive = hyperdrive(ram)
  archive.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isDuplicate(archive, 'index.js', function (err, duplicate) {
      t.ifError(err)
      t.notOk(duplicate, 'index.js is not a duplicate')
      t.end()
    })
  })
})

test('not duplicate of file in archive', function (t) {
  var archive = hyperdrive(ram)
  archive.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isDuplicate(archive, 'example.js', 'index.js', function (err, duplicate) {
      t.ifError(err)
      t.notOk(duplicate, 'index.js is not a duplicate')
      t.end()
    })
  })
})

test('not duplicate of file in archive other way', function (t) {
  var archive = hyperdrive(ram)
  archive.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
    t.ifError(err)

    isDuplicate(archive, 'index.js', 'example.js', function (err, duplicate) {
      t.ifError(err)
      t.notOk(duplicate, 'index.js is not a duplicate')
      t.end()
    })
  })
})
