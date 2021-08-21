const { rotate } = require('./transform');

class ProcessCSV {

    process(rowArray) {
        const obj = this.buildObjectFromJson(rowArray);
        if (obj.is_valid) {
            // do the job: rotate
            obj.json = rotate(obj.json);
            // set output json as string
            obj.json = JSON.stringify(obj.json);
        }
        return obj;
    }

    buildObjectFromJson(rowArray) {
        const obj = { id: rowArray[0], json: [], is_valid: false };
        try {
            if (rowArray[1] && typeof rowArray[1] === 'string') {
                obj.json = JSON.parse(rowArray[1].trim());
            }
            obj.is_valid = this.checkValid(obj.json);
            if (!obj.is_valid) obj.json = [];
        } catch (e) {
            obj.is_valid = false;
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
