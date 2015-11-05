//Muestra los alumnos
exports.index = function(req, res) {
	models.Alumno.findAll().then(
		function(alumno){
			res.render('alumnos/index.ejs', {alumno: alumno});
		}
	).catch(function(error){next(error);})
};
