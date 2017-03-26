var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const assert = require('assert');


const url = 'mongodb://localhost:27017/crud';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get route for get data from database
router.get('/get-data', (req, res, next) => {
  // variable to hold all data got from database
  const resultArray = [];
  // connect mongo to get data
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    const cursor = db.collection('user-data').find();

    // loop through all datas to view in fronend
    cursor.forEach((doc, err) => {
      assert.equal(null, err);
      resultArray.push(doc);
    }, () => {
      db.close();
      res.render('index', { items: resultArray });
    });

  });
});

// Post route to insert data to database
router.post('/insert', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, (err, result) => {
      assert.equal(null, err);
      console.log('Data Inserted');
      db.close();
    });
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
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    db.collection('user-data').updateOne({ "_id": objectId(id) }, { $set: item }, (err, result) => {
      assert.equal(null, err);
      console.log('Data Updated');
      db.close();
    });
  });
});

// Post route to delete data from database
router.post('/delete', (req, res, next) => {
  const id = req.body.id;
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({ "_id": objectId(id) }, (err, result) => {
      assert.equal(null, err);
      console.log('Data deleted');
      db.close();
    });
  });
});

module.exports = router;
