// GET /quizes/question
exports.question = function(req, res) {
    res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
    if(req.query.respuesta === 'Roma'){
        req.app.locals.aciertos += 1;
        res.render('quizes/answer', {respuesta: 'Correcto'});
    } else {
        req.app.locals.fallos += 1;
        res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
};

