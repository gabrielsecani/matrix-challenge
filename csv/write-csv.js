const { format } = require('@fast-csv/format');

class WriteCSV {

    csvStream = null;

    constructor(toStream) {
        this.csvStream = format({ headers: true, rowDelimiter: '\n' });
        if (toStream) {
            this.csvStream.pipe(toStream);
        } else {
            this.csvStream.pipe(process.stdout);
        }
    }

    writeData(data) {
        this.csvStream.write(data);
    }

    end() {
        this.csvStream.end();
    }

}

exports.WriteCSV = WriteCSV;
