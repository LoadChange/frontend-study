const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');
const login = ({ username, password }) => {
  username = escape(username);
  password = genPassword(password);
  const sql = `select username,realname from users where username=${username} and password='${password}'`;
  console.log(sql)
  return exec(sql).then(res => {
    return res[0] || {};
  });
};

module.exports = {
  login
};
