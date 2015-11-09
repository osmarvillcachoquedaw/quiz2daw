
/*tabla de materias*/

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('materias',
	{
		id: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->id de la materia"}}
		},
		materia: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta la materia"}}
		},
		ensenanza: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta la enseñanza"}}
		},
		curso: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Fatal el curso"}}
		}
	});
}