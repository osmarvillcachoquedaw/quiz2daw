var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
			{dialect: "sqlite", storage: "quiz.sqlite"}
		);

var Alumno = sequelize.import(path.join(__dirname, 'alumno'))
var Comment = sequelize.import(path.join(__dirname, 'comment'));
var Cuestionario = sequelize.import(path.join(__dirname, 'cuestionario'));
var CuestionarioAsignado = sequelize.import(path.join(__dirname,'cuestionarioAsignado'));
var Grupo = sequelize.import(path.join(__dirname, 'grupo'));
var Materia = sequelize.import(path.join(__dirname, 'materia'));
var Observacion = sequelize.import(path.join(__dirname, 'observacion'));
var Profesor = sequelize.import(path.join(__dirname, 'profesor'));
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var User = sequelize.import(path.join(__dirname, 'user'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

Profesor.belongsTo(User, {foreignKey: 'idUsuario'});
User.hasMany(Profesor);

Grupo.belongsTo(Profesor, {foreignKey: 'creador'});
Profesor.hasMany(Grupo);

Cuestionario.belongsTo(Profesor, {foreignKey: 'creador'});
Profesor.hasMany(Cuestionario);

CuestionarioAsignado.belongsTo(Cuestionario, Alumno);	
Alumno.hasMany(CuestionarioAsignado);
Cuestionario.hasMany(CuestionarioAsignado);

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	// then(..) ejecuta el manejador una vez creada la tabla
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

	Profesor.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si est� vac�a
		Profesor.create({ apellidos: 'Sierra Olmos' ,
					  nombre: 'Alberto',
					  email: 'albertosierra@gmail.com',
					  dni: '12345678E',
					  movil: '699699699',
					  departamento: 'Informatica',
					  userId: 2
		})
		.then(function(){console.log('Tabla Profesor inicializada')});
		};
	});

	Grupo.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si está vacía
			Grupo.create({ tutor: 1 ,
					  anyo: '2015' ,
					  grupo: "DAW" ,
					  subgrupo: "DAW" ,
					  ensenanza: "FP" ,
					  curso: "2" ,
					  horarioVisita: "12:00"
			});
			Grupo.create({ 
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
	Materia.count().then(function(count) {
		if(count === 0) { // la tabla se inicializa solo si esta vacia
		Materia.create({ materia: 'servidor', ensenanza: 'informatica', curso: '2DAW'
					 
		});
		Materia.create({ materia: 'cliente', ensenanza: 'informatica', curso: '2DAW'
		})
		.then(function(){console.log('Tabla Materia inicializada')});
		};
	});
});

exports.Alumno = Alumno;
exports.Comment = Comment;
exports.Cuestionario = Cuestionario;
exports.CuestionarioAsignado = CuestionarioAsignado;
exports.Grupo = Grupo;
exports.Materia = Materia;
exports.Observacion = Observacion;
exports.Profesor = Profesor;
exports.Quiz = Quiz; 
exports.User = User;
