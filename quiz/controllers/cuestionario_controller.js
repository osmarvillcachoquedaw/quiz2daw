<<<<<<< 9441cc9dd56b1f661cae37607e8853b052df90bb
var models = require('../models/models.js'); //coje el modelo estructura de cuestionario

=======
var models = require('../models/models.js');//coje el modelo estructura de cuestionario
exports.load = function(req, res, next, cuestionarioId) {
		models.Cuestionario.find({
			where: {
				id: Number(cuestionarioId)
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
    models.Cuestionario.findAll().then(
            function(cuestionarios) {
                res.render('cuestionarios/index.ejs', {cuestionarios: cuestionarios});
            });
};
