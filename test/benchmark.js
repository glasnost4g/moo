
const fs = require('fs')
const Benchmark = require('benchmark')

const BrickFace = require('../brickface')

let suite = new Benchmark.Suite()


const python = require('./python')
let pythonFile = python.pythonFile
let tokenizePython = python.tokenize

suite.add('python', function() {
  tokenizePython(pythonFile, () => {})
})

let pythonFile10 = ''
for (var i = 10; i--; ) { pythonFile10 += pythonFile }
suite.add('python x10', function() {
  tokenizePython(pythonFile10, () => {})
})

let pythonFile100 = ''
for (var i = 100; i--; ) { pythonFile100 += pythonFile }
suite.add('python x100', function() {
  tokenizePython(pythonFile100, () => {})
})

let kurtFile = fs.readFileSync('test/kurt.py', 'utf-8')
suite.add('python kurt', function() {
  tokenizePython(kurtFile, () => {})
})



suite.on('cycle', function(event) {
    var bench = event.target;
    if (bench.error) {
        console.log('  ✘ ', bench.name)
        console.log(bench.error.stack)
        console.log('')
    } else {
        console.log('  ✔ ' + bench)
    }
})
.on('complete', function() {
    // TODO: report geometric mean.
})
.run()


