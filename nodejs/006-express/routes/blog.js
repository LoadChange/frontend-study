var express = require('express');
var router = express.Router();

const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');

router.get('/list', function(req, res, next) {
  console.log('>>>>>>>>')
  const { author = '', keyword = '' } = req.query;
  return getList(author, keyword).then(listData => res.json(new SuccessModel(listData)));
});

router.get('/detail', function(req, res, next) {
  res.json({ errno: 0, data: 'OK' });
});

module.exports = router;
