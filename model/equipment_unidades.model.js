import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Equipment_Unidades = db.define(
  "unidades",
  {
    id_unidades: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    codigo_s: {
      type: DataTypes.STRING(3),
      unique: true,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    info: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    id_sistemas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_ubicaciones: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    schema: "equipment",
    tableName: "unidades",
    timestamps: true,
  }
);

export default Equipment_Unidades;
