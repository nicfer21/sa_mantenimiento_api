import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const M_Trabajadores = db.define(
  "trabajadores",
  {
    id_trabajadores: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dni: {
      type: DataTypes.STRING(8),
      unique: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    info: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "trabajadores",
    timestamps: true,
    schema: "worker",
  }
);

export default M_Trabajadores;
