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
	{dni: "DNI", nombre: "Nombre", apellido1: "Apellido1", apellido2: "Apellido2", email: "E-mail"}
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
				alumno.save({fields: ["dni","nombre", "apellido1", "apellido2", "email"]}).then(function(){
					res.redirect('/alumnos');
				})	//Redireccion HTTP (URL relativo) lista de preguntas
			}
		}
	);
};
