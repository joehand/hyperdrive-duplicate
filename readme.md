# hyperdrive-duplicate

[![Travis](https://img.shields.io/travis/joehand/hyperdrive-duplicate.svg?style=flat-square)](https://travis-ci.org/joehand/hyperdrive-duplicate) [![npm](https://img.shields.io/npm/v/hyperdrive-duplicate.svg?style=flat-square)](https://npmjs.org/package/hyperdrive-duplicate)

Check if a file on the filesystem is the same as an entry in hyperdrive by comparing `stat` objects and file contents.

* Compare `archive.stat` and `fs.stat` first, then
* Compare `archive.createReadStream` and `fs.createReadStream` (will fail as soon as stream differs).

**Warning! Can be decrease performance to check duplicates of many large files.**

## Usage

```js
var isDuplicate = require('hyperdrive-duplicate')

var archive = hyperdrive(ram)

archive.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
  if (err) throw err
  // example.js is now in the archive
  // we can see if the fs file is duplicate
  isDuplicate(archive, 'example.js', function (err, duplicate) {
    if (err) throw err
    if (duplicate) console.log('example.js is duplicate!')
  })

  isDuplicate(archive, 'index.js', 'example.js', function (err, duplicate) {
    // index.js is a file on our fs
    // example.js is the file in our archive
    if (err) throw err
    if (duplicate) console.log('index.js not a duplicate of example.js!')
  })
})
```

## API

### isDuplicate(archive, filePath, [entryName], cb)

Callback returns `(err, isDuplicate)` where `isDuplicate` is a boolean, true if the file is a duplicate.

If `filePath` is different from the entry name in hyperdrive, specify both.

## License

MIT
