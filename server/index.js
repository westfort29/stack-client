var express = require('express');
var cors = require('cors');
var fetch = require('node-fetch');
var app = express();

var questionsMock = null;
var userQuestionsMock = null;
var tagQuestionsMock = null;
var answersMock = null;

//UNCOMMENT TO USE MOCK DATA OR COMMENT TO USE REAL API
questionsMock = require('./mocks/questions.json');
userQuestionsMock = require('./mocks/user-questions.json');
tagQuestionsMock = require('./mocks/tag-questions.json');
answersMock = require('./mocks/answers');

// CORS
app.use(cors());
app.options('*', cors());

const API_BASE_URL = "http://api.stackexchange.com/2.2/";

app.get('/questions', function (req, res) {
  var searchString = encodeURIComponent(req.query.searchValue.trim());

  let url = `${API_BASE_URL}search?order=desc&sort=activity&intitle=${searchString}&site=stackoverflow&filter=!-*jbN-o9Aeie`
  console.log(`sending request to ${url}`);

  if (questionsMock) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.status(200);
    res.send(convertQuestions(questionsMock));
  } else {
    console.log('real api call');
    handleQuestionsRequest(url, res);
  }
});

app.get('/questions/user', function (req, res) {
  var userId = req.query.userId;

  let url = `${API_BASE_URL}users/${userId}/questions?order=desc&sort=votes&site=stackoverflow`;
  console.log(`sending request to ${url}`);

  if (userQuestionsMock) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.status(200);
    res.send(convertQuestions(userQuestionsMock));
  } else {
    console.log('real api call');
    handleQuestionsRequest(url, res);
  }
});

app.get('/questions/tag', function (req, res) {
  var tag = encodeURIComponent(req.query.tag.trim());

  let url = `${API_BASE_URL}search?pagesize=10&order=desc&sort=votes&tagged=${tag}&site=stackoverflow`
  console.log(`sending request to ${url}`);

  if (tagQuestionsMock) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.status(200);
    res.send(convertQuestions(tagQuestionsMock));
  } else {
    console.log('real api call');
    handleQuestionsRequest(url, res);
    }
});

app.get('/answers', function (req, res) {
  var questionId = encodeURIComponent(req.query.questionId.trim());

  let answersUrl = `${API_BASE_URL}questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wzu0T`
  let questionUrl = `${API_BASE_URL}questions/${questionId}?order=desc&sort=activity&site=stackoverflow&filter=!-*jbN-o9Aeie`;
  console.log(`sending request to ${answersUrl} and ${questionUrl}`);

  if (answersMock) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.status(200);
    res.send(answersMock);
  } else {
    console.log('real api call');

    Promise.all([
      fetch(answersUrl)
        .then(data => data.json()),
      fetch(questionUrl)
        .then(question => question.json())
    ])
      .then(responses => {

        let result = {
          answers: [],
          question: {}
        };

        result.answers = convertAnswers(responses[0]);
        result.question = convertQuestions(responses[1])[0];

        res.header('Content-Type', 'application/json;charset=UTF-8');
        res.status(200);
        console.log(JSON.stringify(result, null, 2));
        res.send(result);
      })
      .catch((exeption) => {
        res.status(400);
        res.send();
      });
    }
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
    convertedQuestion.creation_date = question.creation_date;
    convertedQuestion.body = question.body;
    result.push(convertedQuestion);
  });
  return result;
}

function convertAnswers(answers) {
  var result = [];
  answers.items.forEach(answer => {
    var convertedAnswer = {};
    convertedAnswer.owner = Object.assign({}, answer.owner);
    convertedAnswer.answers_id = answer.answers_id;
    convertedAnswer.creation_date = answer.creation_date;
    convertedAnswer.body = answer.body;
    convertedAnswer.question_id = answer.question_id;
    result.push(convertedAnswer);
  });
  return result;
}

function handleQuestionsRequest(url, res) {
  fetch(url)
    .then(data => data.json())
    .then((data) => {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.status(200);
      res.send(convertQuestions(data));
    })
    .catch((exeption) => {
      res.status(400);
      res.send();
    })
}

app.get('/', function(req, res) {
  res.send('<h1>StackOverflow api frontier middleware server</h1>');
})

app.listen(3000, function () {
  console.log('Server started on http://localhost:3000 !');
});