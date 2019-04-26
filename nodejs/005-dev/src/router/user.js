const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const { method, url, path } = req;
  if (method === 'GET' && path === '/api/user/login') {
    // const results = login(req.body);
    const results = login(req.query);
    if (results) {
      return results.then(user => {
        if (user.username) {
          req.session.user = user;
          return new SuccessModel(user);
        }
        return new ErrorModel('登录失败');
      });
    }
  }

  if (method === 'GET' && path === '/api/user/login-test') {
    console.log('req.session',req.session) 
    if (req.session) {
      return Promise.resolve(new SuccessModel(req.session));
    }
    return Promise.resolve(new ErrorModel('尚未登录'));
  }
};

module.exports = handleUserRouter;
