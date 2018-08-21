var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var app = express();

// CORS
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.get('/course', function (req, res) {
  var courseId = req.query.id;
  var result = {};
  for (var i = 0; i <= courses.length - 1; i++) {
    if (courses[i].id == courseId) {
      result = courses[i];
    }
  }
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.send(result);
});

app.listen(3000, function () {
  console.log('Server started on port 3000!');
});