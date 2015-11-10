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

// Importar la definición de la tabla Observacion en observacion.js
var Observacion = sequelize.import(path.join(__dirname, 'observacion'));

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
	Observacion.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Observacion.create({ profesor: 'Soro' ,
							 cuestionario: 1,
							 observacion:'Estoy muy feliz.'
		});
		Observacion.create({ profesor: 'Jose' ,
							 cuestionario: 2,
							 observacion:'Me encanta'
		});
		Observacion.create({ profesor: 'Alberto' ,
							 cuestionario: 3,
							 observacion:'Muy contento.'
		})
		.then(function(){console.log('Tabla Observacion inicializada')});
		};
	});
});

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment;// exportar definición de tabla Comment
exports.User = User;// exportar definición de tabla User
exports.Observacion = Observacion;// exportar definición de tabla Observacion