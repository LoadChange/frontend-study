const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const SESSION_DATA = {};

const getCookeExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

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
      resolve(JSON.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  const { url, headers } = req;
  const [path, _query] = url.split('?');
  req.path = path;
  req.query = querystring.parse(_query);
  const { cookie = '' } = headers;
  req.cookie = {};
  cookie.split(';').forEach(item => {
    const [key = '', val = ''] = item.split('=');
    req.cookie[key.trim()] = val.trim();
  });

  let needSetCookie = false;
  let { userId } = req.cookie;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.sessionId = userId;
  req.session = SESSION_DATA[userId];

  res.setHeader('Content-type', 'application/json');
  getPostData(req).then(postData => {
    req.body = postData;
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      if (needSetCookie) {
        res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookeExpires()}`);
      }
      blogResult.then(blogData => res.end(JSON.stringify(blogData)));
      return;
    }
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      if (needSetCookie) {
        res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookeExpires()}`);
      }
      userResult.then(userData => res.end(JSON.stringify(userData)));
      return;
    }
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  });
};

module.exports = serverHandle;

//process.env.NODE_ENV
