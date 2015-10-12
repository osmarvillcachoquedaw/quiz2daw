
exports.autores = function(req, res) {
	var mi_Array=["Alex","Osmar","Luis","Lenin"];
    res.render('autores', {Mi_respuesta: mi_Array });
};


