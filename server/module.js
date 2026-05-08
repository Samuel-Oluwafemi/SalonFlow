// This file is used to export the server module for use in other parts of the application.
// we import the server file into this module file using a require statement. 
// This allows us to keep our server code organized and modular, 
// making it easier to maintain and scale as our application grows.
const xyz = require('./server')
console.log(xyz.names, xyz.age);

const os = require('os');
console.log(os.platform(), os.arch(), os.cpus().length);

// Alternatively, we can use destructuring assignment to directly extract the names and age variables 
// from the imported module, like this:
//  we use this step when we want to import specific variables or functions from the module, 
// rather than the entire module object.
// const { names, age } = require('./server')
// console.log(names, age);