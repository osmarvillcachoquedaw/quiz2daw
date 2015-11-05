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

// Importar la definición de la tabla Profesor en profesor.js
var Profesor = sequelize.import(path.join(__dirname, 'profesor'));

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
	
	Profesor.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Profesor.create({ apellidos: 'Sierra Olmos' ,
					  nombre: 'Alberto',
					  email: 'albertosierra@gmail.com',
					  dni: '12345678E',
					  movil: '699699699',
					  departamento: 'Informatica'
		})
		.then(function(){console.log('Tabla Profesor inicializada')});
		};
	});
	
});

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//Relacion Profesor

Profesor.belongsTo(User);
User.hasMany(Profesor, {foreignKey: 'idUsuario'});


exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment;
exports.User = User;
exports.Profesor = Profesor;