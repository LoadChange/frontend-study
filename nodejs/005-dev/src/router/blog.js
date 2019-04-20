const { getList,getDetail } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req, res) => {
  const { method, url, path } = req;
  if (method === 'GET' && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  if (method === 'GET' && path === '/api/blog/detail') {
    const { id } = req.query;
    const detail = getDetail(id);
    return new SuccessModel(detail);
  }
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '这是新建接口详情的接口'
    };
  }
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '这是U接口详情的接口'
    };
  }
  if (method === 'POST' && path === '/api/blog/delete') {
    return {
      msg: '这是D接口详情的接口'
    };
  }
};

module.exports = handleBlogRouter;
