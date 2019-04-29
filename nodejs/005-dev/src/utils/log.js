const env = process.env.NODE_ENV;
const fs = require('fs');
const path = require('path');

function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

function createWriteStream(fileName) {
  const fillFileName = path.join(__dirname, '../../', 'logs', fileName);
  return fs.createWriteStream(fillFileName, {
    flags: 'a'
  });
}

const accessWriteStream = createWriteStream('access.log');

function access(log) {
  if (env === 'dev') {
    console.log(log);
    return;
  }
  writeLog(accessWriteStream, log);
}

module.exports = {
  access
};
