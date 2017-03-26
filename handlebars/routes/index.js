var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// Get route with parameter
router.get('/test/:id', (req, res, next) => {
  res.render('test', { output: req.params.id });
});

// POSt route to handle form
router.post('/test/submit', (req, res, next) => {
  res.redirect(`/test/${req.body.id}`);
});

module.exports = router;
