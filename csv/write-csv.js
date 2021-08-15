const {format} = require('@fast-csv/format');

class WriteCSV {

    csvStream = null;
    outputStream = process.stdout;


    constructor(toStream) {
        this.csvStream = format({headers: true, rowDelimiter: '\r\n'})
            .transform(this.transform);
        if (toStream) {
            this.outputStream = toStream;
        }
        this.csvStream.pipe(this.outputStream);
        // this.csvStream.on('end', () => process.exit());
    }

    transform(row) {
        row.json = JSON.stringify(row.json);
        return row;
    }

    writeDataArray(dataArray) {
        dataArray.forEach(this.writeData);
    }

    writeData(data) {
        this.csvStream.write(data);
    }

    end() {
        this.csvStream.end();
    }

}

exports.WriteCSV = WriteCSV;
