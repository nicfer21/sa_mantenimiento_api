import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const C_Sesiones = db.define(
  "sesiones",
  {
    id_sesiones: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "sesiones",
    timestamps: true,
    schema: "worker",
  }
);

export default C_Sesiones;
