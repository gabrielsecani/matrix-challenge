
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

function lineColumnToIndex({ line, column }, matrixSize) {
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

function getInnerMatrix(vec, lastIndex) {
    if (lastIndex >= 3) {
        const lincols = [];
        const innerVec = vec.filter((val, originalIndex) => {
            let lincol = indexToLineColumn(originalIndex, lastIndex + 1);
            lincol.originalIndex = originalIndex;
            // neither first line or column and neither last line or column
            const isInner = lincol.line > 0 && lincol.column > 0 && lincol.line < lastIndex && lincol.column < lastIndex;
            if (isInner) {
                lincols.push(lincol);
            }
            return isInner;
        });
        rotate(innerVec).forEach((val, i) => {
            vec[lincols[i].originalIndex] = val;
        });
    }
    return vec;
}

function rotate(vec) {
    if (vec.length == 1) return vec;
    const matrixSize = Math.sqrt(vec.length);
    const lastIndex = matrixSize - 1;
    vec = getInnerMatrix(vec, lastIndex);
    return vec.map((val, j) => {
        let lincol = indexToLineColumn(j, matrixSize);
        conditionsRulesLeftToRight
            .filter(c => c.condition(lincol, lastIndex))
            .filter((c, i) => i == 0)
            .forEach(c => c.process(lincol));
        const newIdx = lineColumnToIndex(lincol, matrixSize);
        if (newIdx >= vec.length || newIdx < 0) {
            console.log('something goes wrong with rules: ', lincol, newIdx, val, j);
            return vec[j];
        }
        return vec[newIdx];
    });
}

exports.rotate = rotate;

