
# hyperdrive-duplicate

Check if a file is the same as an entry in hyperdrive.

## Usage

```js
var isDuplicate = require('hyperdrive-duplicate')

var drive = hyperdrive(memdb())
var archive = drive.createArchive({file: function (name) { return raf(name) }})

archive.append('example.js', function (err) {
  if (err) throw err
  // example.js is now in the archive
  // we can see if the fs file is duplicate
  isDuplicate(archive, 'example.js', function (err, duplicate) {
    if (err) throw err
    if (duplicate) console.log('example.js is duplicate!')
  })
})
```

## API

### isDuplicate(archive, filePath, [entryName], cb)

Callback returns true if the file is a duplicate.

If `filePath` is different from the entry name in hyperdrive, specify both.

## License

MIT