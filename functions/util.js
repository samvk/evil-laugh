module.exports.randomPop = (arr) => arr[Math.floor(Math.random() * arr.length)];
module.exports.randomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
