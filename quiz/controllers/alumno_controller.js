var models = require('../models/models.js');

exports.load = function(req, res, next, alumnoId) {
	models.Alumno.find({
		where : {
			id : Number(alumnoId)
		},
	}).then(function(alumno) {
		if (alumno) {
			req.alumno = alumno;
			next();
		} else {
			next(new Error('No existe alumnoId=' + alumnoId));
		}
	}).catch(function(error) {
		next(error);
	});
};
exports.destroy = function(req, res) {
	req.alumno.destroy().then(function() {
		res.redirect('/alumnos');
	}).catch(function(error) {
		next(error)
	});
}; 
//Muestra los alumnos
exports.index = function(req, res) {
	models.Alumno.findAll().then(
		function(alumnos){
			res.render('alumnos/index.ejs', {alumnos: alumnos});
		}
	).catch(function(error){next(error);})
};

/*AnhadirAlumno*/