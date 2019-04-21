const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      console.log(postData)
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  const { url } = req;
  const [path, _query] = url.split('?');
  req.path = path;
  req.query = querystring.parse(_query);
  res.setHeader('Content-type', 'application/json');
  getPostData(req).then(postData => {
    req.body = postData;
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
  });
};

module.exports = serverHandle;

//process.env.NODE_ENV
