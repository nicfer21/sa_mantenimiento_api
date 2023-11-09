import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const C_Usuarios = db.define(
  "cliente_usuarios",
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
    tableName: "cliente_usuarios",
    timestamps: true,
  }
);

export default C_Usuarios;
