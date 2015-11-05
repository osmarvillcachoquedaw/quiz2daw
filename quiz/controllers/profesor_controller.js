var models = require('../models/models.js');

//Muestra los profesores
exports.index = function(req, res) {
	models.Profesor.findAll().then(
		function(profesores){
			res.render('profesores/index.ejs', {profesores: profesores});
		}
	).catch(function(error){next(error);})
};

///////////////EDITANDO LA FUNCIONALIDAD AÑADIR USUARIO

// GET /profesores/new
exports.new = function(req, res) {
	var profesor = models.Profesor.build( //crea objeto quiz
	{apellidos: "apellidos", nombre: "nombre", email: "email", dni: "dni", movil: "movil", departamento: "departamento", idUsuario: "12345"}
	);
    res.render('profesores/new', {profesor: profesor});
};

// POST /profesores/create
exports.create = function(req, res) {
	var profesor = models.Profesor.build( req.body.profesor );
	
	//guarda en DB
	profesor.validate()
	.then(
		function(err){
			if(err) {
			res.render('profesor/new', {profesor: profesor, errors: err.errors});
			} else {
				profesor.save({fields: ["apellidos", "nombre", "email", "dni", "movil", "departamento", "idUsuario"]}).then(function(){
					res.redirect('/profesores');
				})	//Redireccion HTTP (URL relativo) lista de profesores
			}
		}
	);
};
