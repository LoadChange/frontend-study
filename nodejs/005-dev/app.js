const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
  const { url } = req;
  const [path, _query] = url.split('?');
  req.path = path;
  req.query = querystring.parse(_query);
  res.setHeader('Content-type', 'application/json');
  const blogData = handleBlogRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.write('404 Not Found\n');
  res.end();
};

module.exports = serverHandle;

//process.env.NODE_ENV
