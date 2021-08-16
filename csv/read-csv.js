const fs = require('fs');
const parse = require('csv-parse');

class ReadCSV {

    onRecordCasting(value, checkValid) {
        var json = [], valid = false;
        try {
            if (!!value[1]) {
                json = JSON.parse(value[1].trim());
            }
            if (!!checkValid) {
                valid = checkValid(json);
            }
            json = valid ? json : [];
        } catch (e) {
            valid = false;
        }
        return {id: value[0], json: json, valid: valid};
    }

    readFile(filePath, checkValid) {
        this.checkValid = checkValid;
        return new Promise((resolve, reject) => {
            const csvData = [];
            fs.createReadStream(filePath)
                .pipe(parse({delimiter: ',', fromLine: 2}))
                .on('data', (row) => csvData.push(this.onRecordCasting(row, this.checkValid)))
                .on('end', () => resolve(csvData))
                .on('error', (err) => reject(err))
        });
    }
}

exports.ReadCSV = ReadCSV;
