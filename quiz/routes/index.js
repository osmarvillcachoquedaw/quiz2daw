var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller')
var autorController = require('../controllers/autor_controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/autores', autorController.list);

module.exports = router;
