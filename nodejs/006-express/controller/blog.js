const { exec } = require('../db/mysql');
const xss = require('xss');
const getList = (author, keyword) => {
  const sql = ['select * from blogs where 1=1 '];
  if (author) {
    sql.push(`and author = '${author}' `);
  }
  if (keyword) {
    sql.push(`and title like '%${keyword}%' `);
  }
  sql.push('order by createtime desc');
  return exec(sql.join(''));
};
const getDetail = id => {
  return exec(`select * from blogs where id = '${id}'`);
};

const newBlog = blog => {
  const { title, content, author } = blog;
  const createTime = Date.now();
  const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', '${createTime}')`;
  return exec(sql);
};

const updateBlog = (id, blog) => {
  const { title, content, author } = blog;
  title = xss(title);
  const sql = `update blogs set title='${title}', content='${content}' where id='${id}' and author=${author}`;
  return exec(sql).then(({ affectedRows }) => affectedRows > 0);
};
const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id = '${id}' and author='${author}'`;
  return exec(sql).then(({ affectedRows }) => affectedRows > 0);
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
};
