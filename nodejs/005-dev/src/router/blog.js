const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req, res) => {
  const { method, url, path, body } = req;
  const { id } = req.query;
  if (method === 'GET' && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  if (method === 'GET' && path === '/api/blog/detail') {
    const detail = getDetail(id);
    return new SuccessModel(detail);
  }
  if (method === 'POST' && path === '/api/blog/new') {
    return new SuccessModel(newBlog(body));
  }
  if (method === 'POST' && path === '/api/blog/update') {
    const results = updateBlog(id, body);
    if (results) {
      return new SuccessModel();
    }
    return new ErrorModel('更新博客失败');
  }
  if (method === 'POST' && path === '/api/blog/delete') {
    const results = deleteBlog(id);
    if (results) {
      return new SuccessModel();
    }
    return new ErrorModel('删除博客失败');
  }
};

module.exports = handleBlogRouter;
