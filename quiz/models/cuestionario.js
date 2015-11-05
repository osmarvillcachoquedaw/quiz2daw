// modelo cuestionario

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Cuestionario',
	{
		creador: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "->Falta Nombre de Creador"}}
		},
		alumno: {
			type: DataTypes.INTEGER,
			validate: {notEmpty: {msg: "->Falta Alumno"}}
		},
		observaciones: {
			type: DataTypes.STRING,
			validate: {notEmpty: { msg: "->Falta Obervaciones" }}
		},
		Fecha: {
			type: DataTypes.DATE,
			validate: {notEmpty: { msg: "->Falta  Fecha"}}
		}
	});
}