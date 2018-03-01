var express = require('express');
var async = require("async");
var util = require("util");
var fs = require('fs');
var multiparty = require('multiparty');
var msql = require('../dao/manager');
var asql = require('../dao/article');
var tool = require('../util/tool');
var Page = require("../util/page");
var xss = require('xss');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var router = express.Router();

// setup route middlewares
var csrfProtection = csrf({
  cookie: true
});
var parseForm = bodyParser.urlencoded({
  extended: false
});


/* GET admin listing. */
router.get('/', csrfProtection, function(req, res, next) {
  var session = req.session;
  if (session.manager) {
    res.redirect("/admin/manager");
  }
  res.render('login', {
    csrfToken: req.csrfToken()
  });
});

router.post('/', parseForm, csrfProtection, function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var session = req.session;
  if (username && username.trim() != '' && password && password.trim() != '') {
    password = tool.mypassword(password);
    var Manager = DB.get("Manager");
    Manager.where({
      'username': username,
      'password': password
    }, function(err, result) {
      if (!result) {
        res.render('login', {
          err: 'alert(\'用户名或密码错误！\');',
          csrfToken: req.csrfToken()
        });
      } else {
        if (result.length == 1) {
          session.manager = result[0];
          return res.redirect('/admin/manager');
        } else {
          res.render('login', {
            err: 'alert(\'用户名或密码错误！\');',
            csrfToken: req.csrfToken()
          });
        }
      }
    });
  } else {
    res.render('login', {
      err: 'alert(\'用户名和密码必须填写！\');',
      csrfToken: req.csrfToken()
    });
  }
});
// manager
router.get('/manager', csrfProtection, function(req, res, next) {
  var login = req.session.manager;
  var pn = req.query.pn || 1;
  var Manager = DB.get("Manager");
  var page = new Page({
    page: pn,
    pageSize: 20
  });
  Manager.queryPage(page, [], function(err, result) {
    return res.render('manager', {
      login: login,
      page: result,
      csrfToken: req.csrfToken()
    });
  });
});
// manager delete
router.delete('/manager', parseForm, csrfProtection, function(req, res, next) {
  var id = req.query.id;
  var Manager = DB.get("Manager");
  Manager.remove(id, function(err, result) {
    return res.send(result);
  });
});
// manager update
router.post('/manager', parseForm, csrfProtection, function(req, res, next) {
  var id = req.body.id;
  var password = req.body.password;
  var name = req.body.name;
  var manager = {
    id: id,
    name: name
  };
  if (password) {
    manager.password = tool.mypassword(password);
  }
  var Manager = DB.get("Manager");
  Manager.update(manager, function(err, result) {
    return res.send(result);
  });
});
// manager add
router.put('/manager', parseForm, csrfProtection, function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;
  var manager = {
    username: username,
    password: password,
    name: name
  };
  var Manager = DB.get("Manager");
  Manager.insert(manager, function(err, result) {
    return res.send(result);
  });
});

router.get('/manager/add', csrfProtection, function(req, res, next) {
  var login = req.session.manager;
  res.render('manager_add', {
    login: login,
    csrfToken: req.csrfToken()
  });
});

// article
router.get('/article', csrfProtection, function(req, res, next) {
  var login = req.session.manager;
  var pn = req.query.pn || 1;
  var type = req.query.type;
  var sql = asql.queryRAll;
  var params = [];
  if (type && (type - 0) > 0) {
    sql = asql.queryRTAll;
    params[0] = type;
  }
  var Article = DB.get("Article");
  var ArticleType = DB.get("ArticleType");
  var page = new Page({
    page: pn,
    pageSize: 20
  });
  async.waterfall([
    function(cb) {
      var data = {};
      Article.queryPageBySql(sql, page, params, function(err, result) {
        if (!result) {
          cb(err, null);
        } else {
          data.page = result
          cb(err, data);
        }
      });
    },
    function(data, cb) {
      ArticleType.where([], {
        'id': 'asc'
      }, function(err, result) {
        if (!result) {
          cb(err, null);
        } else {
          data.types = result
          cb(err, data);
        }
      });
    }
  ], function(err, results) {
    results.login = login;
    results.type = type;
    results.csrfToken = req.csrfToken();
    res.render('article', results);
  });
});

// article delete
router.delete('/article', parseForm, csrfProtection, function(req, res, next) {
  var id = req.query.id;
  var Article = DB.get("Article");
  Article.remove(id, function(err, result) {
    return res.send(result);
  });
});

router.get('/article/add', csrfProtection, function(req, res, next) {
  var login = req.session.manager;
  var ArticleType = DB.get("ArticleType");
  ArticleType.where([], {
    'id': 'asc'
  }, function(err, result) {
    return res.render('article_add', {
      types: result,
      login: login,
      msg: '',
      csrfToken: req.csrfToken()
    });
  });
});

router.post('/article/add', parseForm, csrfProtection, function(req, res, next) {
  var Article = DB.get("Article");
  var msg = '';
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './public/upload/'
  });
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      msg = err;
    } else {
      var fileCount = 1;
      if (fields.show_type == '1') {
        fileCount = 3;
      }
      var fileNames = new Array();
      for (var i = 1; i <= fileCount; i++) {
        var inputFile = files['thumbnail' + i][0];
        var uploadedPath = inputFile.path;
        var newFileName = new Date().getTime() + "_" + inputFile.originalFilename;
        var dstPath = './public/upload/' + newFileName;
        fileNames[i - 1] = 'upload/' + newFileName;
        //重命名为真实文件名
        fs.rename(uploadedPath, dstPath, function(err) {
          if (err) {
            console.log(err);
          }
        });
      }
      if (fileNames.length > 0) {
        if (fileNames.length == 3) {
          fields.thumbnail1 = fileNames[0];
          fields.thumbnail2 = fileNames[1];
          fields.thumbnail3 = fileNames[2];
        } else {
          fields.thumbnail1 = fileNames[0];
        }
      }
      fields.publishtime = new Date();
      fields.title = xss(fields.title);
      fields.source = xss(fields.source);
      fields.intro = xss(fields.intro);
      Article.insert(fields, function(err, result) {
        if (result.affectedRows == 1) {
          msg = '文章新增成功!'
        } else {
          msg = '文章新增失败!';
        }
        return res.send('<script>alert("' + msg + '");location.href="/admin/article";</script>');
      });
    }
  });
});

router.get('/article/edit/:id', csrfProtection, function(req, res, next) {
  var login = req.session.manager;
  var Article = DB.get("Article");
  var ArticleType = DB.get("ArticleType");
  var id = req.params.id;
  async.waterfall([
    function(cb) {
      var data = {};
      Article.get(id, function(err, result) {
        if (!result) {
          cb(err, null);
        } else {
          data.article = result
          cb(err, data);
        }
      });
    },
    function(data, cb) {
      ArticleType.where([], {
        'id': 'asc'
      }, function(err, result) {
        if (!result) {
          cb(err, null);
        } else {
          data.types = result
          cb(err, data);
        }
      });
    }
  ], function(err, results) {
    results.login = login;
    results.csrfToken = req.csrfToken();
    res.render('article_edit', results);
  });
});


router.post('/article/edit/:id',parseForm, csrfProtection, function(req, res, next) {
  var Article = DB.get("Article");
  var id = req.params.id;
  var msg = '';
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({
    uploadDir: './public/upload/'
  });
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      msg = err;
    } else {
      var fileCount = 1;
      if (fields.show_type == '1') {
        fileCount = 3;
      }
      var fileNames = new Array();
      for (var i = 1; i <= fileCount; i++) {
        var inputFile = files['thumbnail' + i][0];
        var uploadedPath = inputFile.path;
        if (inputFile.originalFilename) {
          var newFileName = new Date().getTime() + "_" + inputFile.originalFilename;
          var dstPath = './public/upload/' + newFileName;
          fileNames[i - 1] = 'upload/' + newFileName;
          //重命名为真实文件名
          fs.rename(uploadedPath, dstPath, function(err) {
            if (err) {
              console.log(err);
            }
          });
        }
      }
      if (fileNames.length > 0) {
        if (fileNames.length == 3) {
          fields.thumbnail1 = fileNames[0];
          fields.thumbnail2 = fileNames[1];
          fields.thumbnail3 = fileNames[2];
        } else {
          fields.thumbnail1 = fileNames[0];
        }
      }
      fields.id = id;
      fields.title = xss(fields.title);
      fields.source = xss(fields.source);
      fields.intro = xss(fields.intro);
      Article.update(fields, function(err, result) {
        if (result.affectedRows == 1) {
          msg = '文章保存成功!'
        } else {
          msg = '文章保存失败!';
        }
        return res.send('<script>alert("' + msg + '");location.href="/admin/article";</script>');
      });
    }
  });
});

router.get('/bye', function(req, res, next) {
  delete req.session.manager;
  res.redirect('/');
});

module.exports = router;
