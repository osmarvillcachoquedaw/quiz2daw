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

// GET /alumnos/new
exports.new = function(req, res) {
	var alumno = models.Alumno.build( //crea objeto alumno
	{dni: "dni", nombre: "nombre", apellido1: "apellido1", apellido2: "apellido2", email: "email"}
	);
    res.render('alumnos/new', {alumno: alumno});
};

// POST /alumnos/create
exports.create = function(req, res) {
	var alumno = models.Alumno.build( req.body.alumno );
	
	//guarda en DB los campos pregunta y respuesta de alumno
	alumno.validate()
	.then(
		function(err){
			if(err) {
			res.render('alumnos/new', {alumno: alumno, errors: err.errors});
			} else {
				alumno.save({fields: ["nombre", "apellidos1", "apellidos2", "e-mail"]}).then(function(){
					res.redirect('/alumnos');
				})	//Redireccion HTTP (URL relativo) lista de preguntas
			}
		}
	);
};
