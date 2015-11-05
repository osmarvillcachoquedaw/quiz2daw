exports.load = function(req, res, next, alumnoId) {
	models.User.find({
		where : {
			id : Number(alumnoId)
		},
	}).then(function(alumnos) {
		if (alumnos) {
			req.alumnos = alumnos;
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
		function(alumno){
			res.render('alumnos/index.ejs', {alumno: alumno});
		}
	).catch(function(error){next(error);})
};
