var models = require('../models/models.js');//coje el modelo estructura de cuestionario

//  GET/cuestioanrios VISTA DE LISTA CUESTIONARIOS
exports.index = function(req, res) {
	models.Cuestionario.findAll().then(
                function(cuestionarios) {
    res.render('cuestionarios/index.ejs', {cuestionarios: cuestionarios});
});
}