var readline = require('readline');
var fs = require('fs');

var fReadName = './data/region.yml';
var fWriteName = './data/region.json';
var fRead = fs.createReadStream(fReadName);
var fWrite = fs.createWriteStream(fWriteName);

var objReadline = readline.createInterface({
  input: fRead,
  terminal: true
});

let china = []
console.log('解析地域文件 YML TO JSON');

objReadline.on('line', (line) => {
  console.log(line)
  let obj = line.split(':')
  let id = (obj[0] + '').trim() - 0
  let name = (obj[1] + '').trim()
  if (line.match(/^(\d)/)) {
    china.push({
      id: id,
      name: name
    })
  }

  if (line.match(/^ \d/)) {
    if (!china[china.length - 1]['venue']) {
      china[china.length - 1]['venue'] = []
    }
    china[china.length - 1]['venue'].push({
      id: id,
      name: name
    })
  }

  if (line.match(/^   \d/)) {
    let LastCityList = china[china.length - 1]['venue']
    let lastCity = LastCityList[LastCityList.length - 1]
    if (!lastCity['venue']) {
      lastCity['venue'] = []
    }
    lastCity['venue'].push({
      id: id,
      name: name
    })
  }
});

var enableWriteIndex = true;
fRead.on('end', () => {
  console.log('原文件读取结束');
  enableWriteIndex = false;
});

objReadline.on('close', () => {
  let result = JSON.stringify(china)
  fWrite.write(result);
  console.log('解析完成...');
  setTimeout(function () {
    console.log(result)
  }, 2000)
});
