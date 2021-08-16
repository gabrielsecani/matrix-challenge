const transform = require('./csv/transform')


const tests = [
    {input: [], shouldBe: []},
    {input: [5], shouldBe: [5]},
    {
        input: [1, 2, 3, 4],
        shouldBe: [3, 1, 4, 2]
    },
    {
        input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        shouldBe: [4, 1, 2, 7, 5, 3, 8, 9, 6]
    },
    {
        input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        shouldBe: [5, 1, 2, 3, 9, 10, 6, 4, 13, 11, 7, 8, 14, 15, 16, 12]
    },
    {
        input: [
            1, 2, 3, 4, 5,
            6, 7, 8, 9, 10,
            11, 12, 13, 14, 15,
            16, 17, 18, 19, 20,
            21, 22, 23, 24, 25,

        ],
        shouldBe: [
            6, 1, 2, 3, 4,
            11, 12, 7, 8, 5,
            16, 17, 13, 9, 10,
            21, 18, 19, 14, 15,
            22, 23, 24, 25, 20,
        ]
    }
]
transform.DEBUG = true;
tests.forEach(t => {
    console.log('testing ', t.input);
    const out = transform.rotate(t.input);
    if (JSON.stringify(t.shouldBe) == JSON.stringify(out)) {
        console.log("\x1b[42m\x1b[30mIt's OK!\x1b[0m", out)
    } else {
        console.log("\x1b[41m\x1b[30mWRONG!\x1b[0m, should be " + JSON.stringify(t.shouldBe) + " and was: " + JSON.stringify(out));
    }
    console.log('')
})
