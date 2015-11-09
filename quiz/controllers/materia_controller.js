var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :userId
exports.load = function(req, res, next, materiaId) {
	models.Materia.find({
		where : {
			id : Number(materiaId)
		},
	}).then(function(materia) {
		if (materia) {
			req.materia = materia;
			next();
		} else {
			next(new Error('No existe materiaId=' + materiaId));
		}
	}).catch(function(error) {
		next(error);
	});
};

// GET /quizes/new
exports.new = function(req, res) {
	var materia = models.Materia.build( //crea objeto materia
	{id: "Id", materia: "Materia", ensenanza: "Ensenanza", curso: "Curso"}
	);
    res.render('materias/new', {materia: materia});
};

// POST /quizes/create
exports.create = function(req, res) {
	var materia = models.Materia.build( req.body.materia );
	
	//guarda en DB los campos de materias
	materia.validate()
	.then(
		function(err){
			if(err) {
			res.render('materias/new', {materia: materia, errors: err.errors});
			} else {
				materia.save({fields: ["id", "materia", "ensenanza", "curso"]}).then(function(){
					res.redirect('/materias');
				})	//Redireccion HTTP (URL relativo) lista de preguntas
			}
		}
	);
};

//Elimina users

exports.destroy = function(req, res) {
	req.materia.destroy().then(function() {
		res.redirect('/materias');
	}).catch(function(error) {
		next(error)
	});
}; 