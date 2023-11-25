import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Maintenance_Ubicaciones = db.define(
  "ubicaciones",
  {
    id_ubicaciones: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_ubicaciones",
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: true,
      field: "nombre",
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "info",
    },
  },
  {
    tableName: "ubicaciones",
    timestamps: true,
    schema: "maintenance",
  }
);

export default Maintenance_Ubicaciones;
