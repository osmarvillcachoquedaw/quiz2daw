exports.load = function(req, res, next, alumnosId) {
	models.User.find({
		where : {
			id : Number(alumnosId)
		},
	}).then(function(alumnos) {
		if (alumnos) {
			req.alumnos = alumnos;
			next();
		} else {
			next(new Error('No existe alumnoId=' + alumnosId));
		}
	}).catch(function(error) {
		next(error);
	});
};
exports.destroy = function(req, res) {
	req.user.destroy().then(function() {
		res.redirect('/alumnos');
	}).catch(function(error) {
		next(error)
	});
}; 

/*apellido1
apellido2
dni
nombre*/