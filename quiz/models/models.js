var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize (null,null,null,
						{dialect: "sqlite", storage: "quiz.sqlite"}
					);
					
//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

//Importar la definicion de la tabla User en user.js
var User = sequelize.import(path.join(__dirname,'User'));

exports.User = User; // exporta la definicion de la tabla User


Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exporta la definicion de la tabla Quiz
exports.Comment = Comment;
//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function(){
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count===0){//la tabla se inicializa solo si está vacia
			Quiz.create({pregunta: 'Capital de Italia',
						respuesta: 'Roma'
			});
			Quiz.create({pregunta: 'Capital de Portugal',
						respuesta: 'Lisboa'
			})
		.then(function(){console.log('Base de datos Quiz inicializada')});
		};
	});
	
	User.count().then(function(count){
		if(count===0){//la tabla se inicializa solo si está vacia
			User.create({username: "admin",
						password: "1234"
			});
			User.create({username: "pepe",
						password: "5678"
			})
		.then(function(){console.log('Base de datos User inicializada')});
		};
	});
});

	