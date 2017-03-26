var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'form validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

// Validation for form with express validator and session
router.post('/submit', (req, res, next) => {
  req.check('email', 'Envalid email address').isEmail();
  req.check('pass', 'Envalid Password').isLength({ min: 4 }).equals(req.body.conpass);
  const errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/');
});

module.exports = router;
