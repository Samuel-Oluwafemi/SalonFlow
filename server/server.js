const names = "john";
console.log(names);

const age = [20, 30, 40];

// to export the names variable and the age variable, we can use module.exports
// module.exports = names;
// OR
module.exports = {
  names,
  age,
};

// // console.log(global)
// setTimeout(() => {
//     console.log('This will run after 3 seconds');
//     // clear the interval after 5 seconds
//     clearInterval(count);
// }, 3000);

// const count = setInterval(() => {
//     console.log('Counting...');
// }, 1000);

// // console.log(process)
// console.log(__dirname);
// console.log(__filename);
