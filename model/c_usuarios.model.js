import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const C_Usuarios = db.define(
  "usuarios",
  {
    id_usuarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    acceso: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_trabajadores: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
    schema: "worker",
  }
);

export default C_Usuarios;
