var express = require('express');
var router = express.Router();
const db = require('monk')('localhost:27017/crud');

const userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get route for get data from database
router.get('/get-data', (req, res, next) => {
  // connect mongo to get data
  userData.find({}).then((docs) => {
    res.render('index', { items: docs });
  }).then(() => {
    db.close();
  });
});

// Post route to insert data to database
router.post('/insert', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  userData.insert(item).then(() => {
    db.close();
  });
  res.redirect('/');
});

// Post route for update data
router.post('/update', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const id = req.body.id;
  // userData.update({ '_id': db.id(id) }, item);
  userData.updateById(id, item).then(() => {
    db.close();
  });
});

// Post route to delete data from database
router.post('/delete', (req, res, next) => {
  const id = req.body.id;
  userData.removeById(id).then(() => {
    db.close();
  });
});

module.exports = router;
