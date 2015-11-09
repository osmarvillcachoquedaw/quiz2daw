
var models = require('../models/models.js'); //coje el modelo estructura de cuestionario

exports.load = function(req, res, next, cuestionarioId) {
		models.Cuestionario.find({
			where: {
				id: Number(cuestionarioId),
                                include: [{ model: models.Profesor }]
			}
		}).then(function(cuestionario) {
			if(cuestionario) {
				req.cuestionario = cuestionario;
				next();
			} else { next(new Error('No existe commentId=' + cuestionarioId))}	
		}
	).catch(function(error){next(error)});
}

//  GET/cuestioanrios VISTA DE LISTA CUESTIONARIOS
exports.index = function(req, res) {

	models.Cuestionario.findAll({
                    include: [{ model: models.Profesor }]
		}).then(
                function(cuestionarios) {
    res.render('cuestionarios/index.ejs', {cuestionarios: cuestionarios});
});
}

