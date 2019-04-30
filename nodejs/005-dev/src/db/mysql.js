const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

const connection = mysql.createConnection(MYSQL_CONF);

connection.connect();

function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  exec,
  escape: mysql.escape
};
