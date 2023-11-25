import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Equipment_Partes = db.define(
  "partes",
  {
    id_partes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    codigo_s: {
      type: DataTypes.STRING(2),
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
    id_unidades: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    schema: "equipment",
    tableName: "partes",
    timestamps: true,
  }
);

export default Equipment_Partes;
