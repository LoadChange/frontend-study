const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const [path, _query] = url.split('?');
  const query = querystring.parse(_query);
  const data = {
    method,
    url,
    path,
    query
  };
  res.setHeader('Content-type', 'application/json');
  if (method === 'GET') {
    res.end(JSON.stringify(data));
  }
  if (method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      data.data = postData;
      res.end(JSON.stringify(data));
    });
  }
});

server.listen(3000, () => {
  console.log('listening on 3000 port');
});
