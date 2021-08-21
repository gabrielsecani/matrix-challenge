const fs = require('fs');
const parse = require('csv-parse');
const { WriteCSV } = require('./csv/write-csv');
const { ProcessCSV } = require('./csv/process-csv');
const { exit } = require('process');

if (process.argv.length !== 3) {
    console.log("Usage:\n" + process.argv0 + " " + process.argv[1] + " fileInput.csv");
    exit(0);
}

const filePath = process.argv[2];

if (!fs.existsSync(filePath)) {
    console.log("File passed does not exists")
    exit(0);
}

const processor = new ProcessCSV();
const out = new WriteCSV();

function onData(row) {
    out.writeData(processor.process(row));
}

fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',', fromLine: 2 }))
    .on('data', onData)
    .on('end', () => out.end())
    .on('error', (err) => console.error(err));

