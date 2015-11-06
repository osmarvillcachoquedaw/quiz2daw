var models = require('../models/models.js');
// Autoload - factoriza el código si ruta incluye :alumnoId
exports.load = function(req, res, next, alumnoId) {
	models.Alumno.find({
            where: { id: Number(alumnoId)},
            
        }).then(function(alumno) {
				if(alumno) {
					req.alumno = alumno;
					next();
				} else { next(new Error('No existe alumnoId=' + alumnoId)); }
			}
	).catch(function(error) { next(error);});
};

// GET /alumnos/new
exports.new = function(req, res) {
	var alumno = models.Alumno.build( //crea objeto alumno
	{nombre: "Nombre", apellidos1: "Apellidos1", apellidos2: "Apellidos2" e-mail: "E-mail"}
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
