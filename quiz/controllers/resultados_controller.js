// GET /resultados
exports.show = function(req, res) {
    res.render('resultados/show', {correctas: req.app.locals.aciertos, incorrectas: req.app.locals.fallos});
};

