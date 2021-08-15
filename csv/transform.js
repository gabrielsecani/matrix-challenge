function lineColumnObj(line, column) {
    return {
        line: line, column: column
    }
}

function indexToLineColumn(index, matrixSize) {
    return lineColumnObj(
        Math.floor(index / matrixSize),
        (index % matrixSize)
    )
}

function lineColumnToIndex({line, column}, matrixSize) {
    return (line * matrixSize) + column;
}

var idRule = 0;
const Rule = (description, condition, process) => ({
    id: idRule++, description, condition, process
})

const conditionsRulesRightToLeft = [
    Rule('if first line until lastColumn-1, add 1 to column',
        (lc, lastIndex) => (lc.line === 0 && lc.column < lastIndex),
        (lc) => lc.column++),
    Rule('if lastColumn until lastLine-1, add 1 to line',
        (lc, lastIndex) => (lc.line < lastIndex && lc.column === lastIndex),
        (lc) => lc.line++),
    Rule('if last line and first column, minus 1 from line',
        (lc, lastIndex) => (lc.line === lastIndex && lc.column === 0),
        (lc) => (lc.line--)),
    Rule('if last line and not first column, minus 1 from column',
        (lc, lastIndex) => (lc.line === lastIndex && lc.column > 0),
        (lc) => (lc.column--)),
    Rule('no rules, no changes',
        (lc, lastIndex) => (true),
        (lc) => (lc)),
]

const conditionsRulesLeftToRight = [
    Rule('if first column until lastLine-1, add 1 to column',
        (lc, lastIndex) => (lc.column === 0 && lc.line < lastIndex),
        (lc) => lc.line++),
    Rule('if lastline and until lastColumn-1, add 1 to line',
        (lc, lastIndex) => (lc.line === lastIndex && lc.column < lastIndex),
        (lc) => lc.column++),
    Rule('if last column and not first line, minus 1 from line',
        (lc, lastIndex) => (lc.column === lastIndex && lc.line > 0),
        (lc) => (lc.line--)),
    Rule('if first line and not first column, minus 1 from column',
        (lc, lastIndex) => (lc.line === 0 && lc.column > 0),
        (lc) => (lc.column--)),
    Rule('no rules, no changes',
        (lc, lastIndex) => (true),
        (lc) => (lc)),
]

function rotate(vec) {
    if (vec.length == 1) return vec;
    const matrixSize = Math.sqrt(vec.length);
    var lastIndex = matrixSize - 1;
    return vec.map((val, j) => {
        let lincol = indexToLineColumn(j, matrixSize);
        // DEBUG
        // console.log("index "+j+": "+lincol.line+","+lincol.column);
        const rules = conditionsRulesLeftToRight
            .filter(c => c.condition(lincol, lastIndex))
            .filter((a, i) => i == 0)
            // DEBUG
            // .map(c => {
            //     console.log(lincol, {desc:c.description});
            //     return c;
            // });
            .forEach(c => c.process(lincol));
        const newIdx = lineColumnToIndex(lincol, matrixSize);
        // DEBUG
        // console.log('new line x col. new idx', lincol, newIdx);
        if (newIdx >= vec.length || newIdx < 0) {
            console.log('something goes wrong with rules: ', lincol, newIdx, val, j);
            return vec[j];
        }
        return vec[newIdx];
    });
}

exports.rotate = rotate;

