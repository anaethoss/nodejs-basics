const url = require('url');
const fs = require('fs');

const renderHTML = (path, res) => {
  fs.readFile(path, null, (err, data) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    if (err) {
      res.writeHead(404);
      res.write('File Not found');
    } else {
      res.write(data);
    }
    res.end();
  });
};

module.exports = {
  reqHandler: (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const path = url.parse(req.url).pathname;
    switch (path) {
      case '/':
        renderHTML('./index.html', res);
        break;
      case '/login':
        renderHTML('./login.html', res);
        break;
      default:
        res.writeHead(404);
        res.write('<h1>Route Not Found..</h1>');
        res.end();
    }
  },
};
