<<<<<<< 9441cc9dd56b1f661cae37607e8853b052df90bb
var models = require('../models/models.js'); //coje el modelo estructura de cuestionario

=======
var models = require('../models/models.js');//coje el modelo estructura de cuestionario
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
>>>>>>> listaCuestionario
//  GET/cuestioanrios VISTA DE LISTA CUESTIONARIOS
exports.index = function(req, res) {
<<<<<<< 624fdd89d5e433807bd10466fbcc79f01af98c74
    models.Cuestionario.findAll().then(
            function(cuestionarios) {
                res.render('cuestionarios/index.ejs', {cuestionarios: cuestionarios});
            });
};
=======
	models.Cuestionario.findAll({
                    include: [{ model: models.Profesor }]
		}).then(
                function(cuestionarios) {
    res.render('cuestionarios/index.ejs', {cuestionarios: cuestionarios});
});
}
>>>>>>> asociando al modelo de profesor
