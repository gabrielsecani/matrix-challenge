const fs = require('fs');
const parse = require('csv-parse');

/*
sample data:
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]”
 */

function funcApply(func, data) {
    if (func && typeof func === 'function') {
        return func.call(data);
    }
    return data;
}

function onRecordCasting(value, checkValid) {
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

exports.readFile = (filePath, checkValid) => new Promise((resolve, reject) => {
    var csvData = [];
    fs.createReadStream(filePath)
        .pipe(parse({delimiter: ',', fromLine: 2}))
        .on('data', function (csvrow) {
            csvrow = onRecordCasting(csvrow, checkValid)
            //do something with csvrow
            csvData.push(csvrow);
        })
        .on('end', function () {
            resolve(csvData);
        })
        .on('error', function (err) {
            console.error(err);
            reject(err);
        });
});
