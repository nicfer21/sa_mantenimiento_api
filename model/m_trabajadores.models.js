import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const M_Trabajadores = db.define(
  "mantenimiento_trabajadores",
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
    tableName: "mantenimiento_trabajadores",
    timestamps: true,
  }
);

export default M_Trabajadores;
