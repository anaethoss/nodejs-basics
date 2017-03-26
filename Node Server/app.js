const http = require('http');
const module1 = require('./module1');
const module2 = require('./module2');

const app = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  res.write('Javascript Aside');
  module2.myFunc();
  res.end();
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Server is running io port 3000');
});
