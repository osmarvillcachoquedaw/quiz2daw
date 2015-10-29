var models = require('../models/models.js');

exports.autenticar = function(login, password, callback){
	if(user){
		
		if(req.query.password === req.quiz.password){
			callback(null,users[login]);
		}
		else{callback(new Error('Password erróneo.')); }
	}else{callback(new Error('No existe usuario.')); }	
};