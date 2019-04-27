const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

const { host, port } = REDIS_CONF;

const connection = redis.createClient(port, host);

connection.on('error', err => console.log(err));

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  connection.set(key, val, redis.print);
}

function get(key) {
  return new Promise((resolve, reject) => {
    connection.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
    });
  });
}

module.exports = {
  set,
  get
};
