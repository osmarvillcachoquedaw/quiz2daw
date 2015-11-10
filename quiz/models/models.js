var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
			{dialect: "sqlite", storage: "quiz.sqlite"}
		);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla User en user.js
var User = sequelize.import(path.join(__dirname, 'user'));

var Grupo = sequelize.import(path.join(__dirname, 'grupo'));

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Quiz.create({ pregunta: 'Capital de Italia' ,
					  respuesta: 'Roma'
		});
		Quiz.create({ pregunta: 'Capital de Portugal' ,
					  respuesta: 'Lisboa'
		})
		.then(function(){console.log('Tabla Quiz inicializada')});
		};
	});
	User.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		User.create({ username: 'admin' ,
					  password: '1234'
		});
		User.create({ username: 'pepe' ,
					  password: '5678'
		})
		.then(function(){console.log('Tabla User inicializada')});
		};
	});
	Grupo.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Grupo.create({ tutor: 'jose' ,
					  anyo: '2015' ,
					  grupo: "DAW" ,
					  subgrupo: "DAW" ,
					  ensenanza: "FP" ,
					  curso: "2" ,
					  horarioVisita: "12:00"
		});
		Grupo.create({ tutor: 'alberto' ,
					  anyo: '2015' ,
					  grupo: "DAW" ,
					  subgrupo: "DAW" ,
					  ensenanza: "FP" ,
					  curso: "1" ,
					  horarioVisita: "12:00"
		})
		.then(function(){console.log('Tabla Grupo inicializada')});
		};
	});
});

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

/* Grupo.belongsTo(Profesor);
Profesor.hasMany(Grupo, {foreignKey: 'tutor'}); */

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment;
exports.User = User;
exports.Grupo = Grupo;