import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Maintenance_Reportes = db.define(
  "reportes",
  {
    id_reportes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    inicio_reportes: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    fin_reportes: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    duracion_reportes: {
      type: DataTypes.DECIMAL(6, 1),
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_ordenes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    schema: "maintenance",
    tableName: "reportes",
    timestamps: true,
  }
);

export default Maintenance_Reportes;
