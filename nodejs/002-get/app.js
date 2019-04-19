const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  console.log(req.method);
  const { url } = req;
  console.log(url)
  req.query = querystring.parse(url.split('?')[1]);
  res.end(JSON.stringify(req.query));
});

server.listen(3000, () => {
  console.log('listening on 3000 port');
});
