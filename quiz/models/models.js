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

// Importar la definición de la tabla Alumno en alumno.js
var Alumno = sequelize.import(path.join(__dirname, 'alumno'))
var Cuestionario = sequelize.import(path.join(__dirname, 'cuestionario'));

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
	Alumno.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
		Alumno.create({ dni: '52748123A',
						apellido1: 'Pérez',
						apellido2: 'López',
						nombre: 'Juan',
						email: 'Juan@gmail.com'
		});
		Alumno.create({ dni: '65127382S',
						apellido1: 'Blazquez',
						apellido2: 'Guijarro',
						nombre: 'Davida',
						email: 'Davida@gmail.com'
		})
		.then(function(){console.log('Tabla Alumno inicializada')});
		};
	});
	Cuestionario.count().then(function(count){
		if(count === 0){
			Cuestionario.create({ creador: 2 ,
									observaciones: 'vacio' ,
									fechaFin: '2015-10-2',
				
			})
			.then(function(){console.log('Tabla Cuestionario inicializada')})
		}
		
	})
});

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

var cuestionario_path = path.join(__dirname, 'cuestionario');
var Cuestionario = sequelize.import(cuestionario_path);

var profesor_path = path.join(__dirname, 'profesor');
var Profesor = sequelize.import(profesor_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment;
exports.User = User;
exports.Alumno = Alumno;
exports.Cuestionario = Cuestionario;

Cuestionario.belongsTo(Profesor);
Profesor.hasMany(Cuestionario);
