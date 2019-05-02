var express = require('express');
var router = express.Router();

const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/login', function(req, res, next) {
  const results = login(req.body);
  if (results) {
    return results.then(user => {
      if (user.username) {
        req.session.user = user;
        res.json(new SuccessModel(user));
        return;
      }
      res.json(new ErrorModel('登录失败'));
    });
  }
});

module.exports = router;
