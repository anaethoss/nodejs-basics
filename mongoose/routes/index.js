var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/crud');
const userSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  author: String,
}, { collection: 'user-data' });

// Modle for user data
const userData = mongoose.model('UserData', userSchema);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// Get route for get data from database
router.get('/get-data', (req, res, next) => {
  // getting data from mongodb and show in the page
  userData.find().then( doc => {
    res.render('index', { items: doc });
  });
});

// Post route to insert data to database
router.post('/insert', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const data = new userData(item);
  data.save();
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
  userData.findById(id, (err, doc) => {
    if(err) {
      console.error(err);
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();
  });
  res.redirect('/');
});

// Post route to delete data from database
router.post('/delete', (req, res, next) => {
  const id = req.body.id;
  userData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
