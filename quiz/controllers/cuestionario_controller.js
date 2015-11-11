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
			} else { next(new Error('No existe cuestinarioId=' + cuestionarioId))}	
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
// GET /alumnos/new
exports.new = function(req, res) {
	var cuestionario = models.Cuestionario.build( //crea objeto alumno
	{creador: "Creador", observaciones: "Observaciones", fechaFin: "Fecha de Finalizacion"}
	);
    res.render('cuestionarios/new', {cuestionario: cuestionario});
};

// POST /alumnos/create
exports.create = function(req, res) {
	var cuestionario = models.Cuestionario.build(
            { texto: req.body.cuestionario.texto,
                ProfesorId: req.params.profesorId
            });
	
	//guarda en DB los campos pregunta y respuesta de cuestionario
	cuestionario.validate()
	.then(
		function(err){
			if(err) {
			res.render('cuestionarios/new', {cuestionario: cuestionario, errors: err.errors});
			} else {
				cuestionario.save({fields: ["creador","observaciones", "fechaFin"]}).then(function(){
					res.redirect('/cuestionarios');
				})	//Redireccion HTTP (URL relativo) lista de cuestionarios
			}
		}
	);
};
