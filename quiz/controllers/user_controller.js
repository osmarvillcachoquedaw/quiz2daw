var models = require('../models/models.js');

exports.autenticar = function(login, pass, callback){
	models.User.find({
			where: {username: login, password: pass}
		}).then(function(user){
			if(user){
				callback(null, user);
			}else{callback(new Error('Error al introducir los datos'));}
		}
	).catch(function(error){ next(error)});
};
