const fs = require('fs');
const path = require('path');
const readline = require('readline');

const fileName = path.join(__dirname, '../../', 'logs', 'access.log');

const readStream = fs.createReadStream(fileName);

const rl = readline.createInterface({
  input: readStream
});

let chromeNum = 0;
let sum = 0;

rl.on('line', lineData => {
  if (!lineData) return;
  const [method, url, ua, timer] = lineData.split(' -- ');
  if (ua.indexOf('Chrome') >= 0) {
    chromeNum++;
  }
  sum++;
});

rl.on('close', () => {
  console.log('chrome 占比:' + chromeNum / sum);
});
