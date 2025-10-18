const { DataTypes } = require('sequelize');
const { connection } = require("../config/database.js");
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { User } = require('./UserModel');

const News = connection.define('News', {
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    UserAlta: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Admin"
    },
    FechaAlta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "1990-01-01T00:00:00.000Z"
    },
    UserMod: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    FechaMod: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:'1990-01-01T00:00:00.000Z'
    },
    UserBaja: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    FechaBaja: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:'1990-01-01T00:00:00.000Z'
    },
}, {
    tableName: 'news'
});

News.belongsTo(Category, { as: 'categoria', foreignKey: 'categoria_id' })
News.belongsTo(State, { as: 'estado', foreignKey: 'estado_id' })
News.belongsTo(User, { as: 'usuario', foreignKey: 'usuario_id' })

module.exports = { News };
