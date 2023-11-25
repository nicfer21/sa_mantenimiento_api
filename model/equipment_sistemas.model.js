import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Equipment_Sistemas = db.define(
  "sistemas",
  {
    id_sistemas: {
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
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    info: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    schema: "equipment",
    tableName: "sistemas",
    timestamps: true,
  }
);

export default Equipment_Sistemas;
