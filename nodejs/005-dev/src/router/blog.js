const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req, res) => {
  const { method, url, path, body } = req;
  const { id } = req.query;
  if (method === 'GET' && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    return getList(author, keyword).then(listData => new SuccessModel(listData));
  }
  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(id).then(([detail]) => {
      return new SuccessModel(detail);
    });
  }
  if (method === 'POST' && path === '/api/blog/new') {
    return newBlog(body).then(insertData => new SuccessModel(insertData));
  }
  if (method === 'POST' && path === '/api/blog/update') {
    return updateBlog(id, body).then(result => (result ? new SuccessModel() : new ErrorModel('更新博客失败')));
  }
  if (method === 'POST' && path === '/api/blog/delete') {
    return deleteBlog(id).then(result => (result ? new SuccessModel() : new ErrorModel('删除博客失败')));
  }
};

module.exports = handleBlogRouter;
