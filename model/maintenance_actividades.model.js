import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Maintenance_Actividades = db.define(
  "actividades",
  {
    id_actividades: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    procedimiento: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duracion: {
      type: DataTypes.DECIMAL(6, 1),
      allowNull: true,
    },
    prioridad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_partes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    variables: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    schema: "maintenance",
    tableName: "actividades",
    timestamps: true,
  }
);

export default Maintenance_Actividades;
