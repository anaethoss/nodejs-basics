const http = require('http');
const app = require('./app');

http.createServer(app.reqHandler).listen(3000, '127.0.0.1', () => {
  console.log('server is running on port 3000');
});
