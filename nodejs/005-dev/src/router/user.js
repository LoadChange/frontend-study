const handleUserRouter = (req, res) => {
  const { method, url, path } = req;
  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: '这是login接口列表的接口'
    };
  }
};

module.exports = handleUserRouter;
