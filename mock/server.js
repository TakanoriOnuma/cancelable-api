const jsonServer = require('json-server');
const server = jsonServer.create();
const bodyParser = require('body-parser');
//const db = require('./db');

const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(bodyParser.json());

// サーバーエラー
server.use((req, res, next) => {
  // return res.sendStatus(500);
  next();
});

// レスポンスを遅延
server.use((req, res, next) => {
  const delay = 4000 * Math.random();
  setTimeout(() => {
    next();
  }, delay);
});

server.get('/data', (req, res) => {
  res.json({ status: 'success!' });
});

const port = 12000;
server.listen(port, () => console.log(`Mock server is listening on http://localhost:${port}`));
