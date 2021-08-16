var fs = require('fs');
const {ReadCSV} = require('./csv/read-csv')
const {WriteCSV} = require('./csv/write-csv')
const transform = require('./csv/transform')

if (process.argv.length !== 3) {
    console.log("Usage:\n" + process.argv0 + " " + process.argv[1] + " fileInput.csv");
    return;
}
const filePath = process.argv[2];

if (!fs.existsSync(filePath)) {
    console.log("File passed does not exists")
    return
}

function checkArrayValid(json) {
    if (Array.isArray(json) && json.length > 0) {
        let sqrt = Math.sqrt(json.length);
        return sqrt === Math.floor(sqrt);
    } else {
        return false;
    }
}

try {
    // console.log("loading file " + filePath);
    (async () => {
        const read = new ReadCSV();
        const data = await read.readFile(filePath, checkArrayValid);
        const out = new WriteCSV();
        data.map(d => {
            if (d.valid) {
                d.json = transform.rotate(d.json);
            }
            return d;
        })
            .forEach(d => out.writeData(d));
        out.end();
    })();
} catch (e) {
    console.error(e);
}
