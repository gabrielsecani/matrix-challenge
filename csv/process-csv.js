const { rotate } = require('./transform');

class ProcessCSV {

    process(rowArray) {
        const obj = this.buildObjectFromJson(rowArray);
        if (obj.valid) {
            // do the job: rotate
            obj.json = rotate(obj.json);
            // set output json as string
            obj.json = JSON.stringify(obj.json);
        }
        return obj;
    }

    buildObjectFromJson(rowArray) {
        const obj = { id: rowArray[0], json: [], valid: false };
        try {
            if (rowArray[1] && typeof rowArray[1] === 'string') {
                obj.json = JSON.parse(rowArray[1].trim());
            }
            obj.valid = this.checkValid(obj.json);
            if (!obj.valid) obj.json = [];
        } catch (e) {
            obj.valid = false;
        }
        return obj;
    }

    checkValid(json) {
        if (Array.isArray(json) && json.length > 0) {
            const sqrt = Math.sqrt(json.length);
            // sqrt must be a exact square root. ~~ do the same as Math.floor 
            return sqrt === ~~(sqrt);
        } else {
            return false;
        }
    }
}

exports.ProcessCSV = ProcessCSV;
