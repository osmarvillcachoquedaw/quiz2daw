var models = require('../models/models.js');

//Muestra los profesores
exports.index = function(req, res) {
	models.Profesor.findAll().then(
		function(profesores){
			res.render('profesores/index.ejs', {profesores: profesores});
		}
	).catch(function(error){next(error);})
};

// POST /profesor/create
exports.create = function(req, res) {
	var profesor = models.Profesor.build( req.body.profesor );
	
	//guarda en DB los campos pregunta y respuesta de quiz
	profesor.validate()
	.then(
		function(err){
			if(err) {
			res.render('profesores/new', {profesor: profesor, errors: err.errors});
			} else {
				profesor.save({fields: ["apellidos", "nombre", "email", "dni", "movil", "departamento", "idUsuario"]}).then(function(){   //hay que tocarlo
					res.redirect('/profesores');
				})	//Redireccion HTTP (URL relativo) lista de preguntas
			}
		}
	);
};