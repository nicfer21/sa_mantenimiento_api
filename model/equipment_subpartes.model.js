import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Equipment_Subpartes = db.define(
  "subpartes",
  {
    id_subpartes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    codigo_s: {
      type: DataTypes.STRING(2),
      allowNull: false,
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
    id_partes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    schema: "equipment",
    tableName: "subpartes",
    timestamps: true,
  }
);

export default Equipment_Subpartes;
