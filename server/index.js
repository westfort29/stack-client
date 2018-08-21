var express = require('express');
var cors = require('cors');
var fetch = require('node-fetch');
var app = express();

// CORS
app.use(cors());
app.options('*', cors());

const API_BASE_URL = "http://api.stackexchange.com/2.2/";

app.get('/questions', function (req, res) {
  var searchString = encodeURIComponent(req.query.searchValue.trim());

  console.log(`${API_BASE_URL}search?order=desc&sort=activity&intitle=${searchString}&site=stackoverflow`);

  var response = {"items":[{"tags":["javascript","typescript","tslint","delete-keyword"],"owner":{"reputation":2105,"user_id":4988637,"user_type":"registered","accept_rate":80,"profile_image":"https://lh3.googleusercontent.com/-m8Xu1FWsVQ0/AAAAAAAAAAI/AAAAAAAAAA8/MhDBfVsYN7g/photo.jpg?sz=128","display_name":"Acidic","link":"https://stackoverflow.com/users/4988637/acidic"},"is_answered":true,"view_count":247,"answer_count":1,"score":2,"last_activity_date":1518964121,"creation_date":1518961474,"last_edit_date":1518961927,"question_id":48852333,"link":"https://stackoverflow.com/questions/48852333/statically-delete-object-key-javascript","title":"Statically delete object key JavaScript"},{"tags":["jquery","html"],"owner":{"reputation":32,"user_id":6430634,"user_type":"registered","accept_rate":89,"profile_image":"https://graph.facebook.com/10153701287271789/picture?type=large","display_name":"Toni Au","link":"https://stackoverflow.com/users/6430634/toni-au"},"is_answered":true,"view_count":21,"accepted_answer_id":38334309,"answer_count":1,"score":1,"last_activity_date":1468340865,"creation_date":1468340314,"last_edit_date":1468340865,"question_id":38334212,"link":"https://stackoverflow.com/questions/38334212/access-dynamic-value-to-delete-object-key","title":"Access dynamic value to delete object key"},{"tags":["javascript","json"],"owner":{"reputation":1811,"user_id":3783804,"user_type":"registered","accept_rate":73,"profile_image":"https://www.gravatar.com/avatar/36541fef4fa53fb45c6d28704c434c44?s=128&d=identicon&r=PG&f=1","display_name":"byrdr","link":"https://stackoverflow.com/users/3783804/byrdr"},"is_answered":true,"view_count":71,"answer_count":1,"score":0,"last_activity_date":1444236311,"creation_date":1444232220,"last_edit_date":1444232696,"question_id":32996556,"link":"https://stackoverflow.com/questions/32996556/javascript-cant-delete-object-key-when-not-in-quotes","title":"javascript can&#39;t delete object key when not in quotes"}],"has_more":false,"quota_max":300,"quota_remaining":246};

  /* fetch(`${API_BASE_URL}search?order=desc&sort=activity&site=stackoverflow&intitle=${searchString}`)
    .then(res => res.json())
    .then((data) => {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.status(200);
      console.log('WHAT THE');
      console.log(data);
      JSON.stringify(data, null, 2);
      res.send(data);
    })
    .catch((exeption) => {
      res.status(400);
      res.send();
    }) */

/* 
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.send(result); */
  var result = convertQuestions(response);
  res.send(result);
});

function convertQuestions(questions) {
  var result = [];
  questions.items.forEach(question => {
    var convertedQuestion = {};
    convertedQuestion.tags = [...question.tags];
    convertedQuestion.owner = Object.assign({}, question.owner);
    convertedQuestion.question_id = question.question_id;
    convertedQuestion.title = question.title;
    convertedQuestion.answer_count = question.answer_count;
    result.push(convertedQuestion);
  });
  return result;
}

app.listen(3000, function () {
  console.log('Server started on port 3000!');
});