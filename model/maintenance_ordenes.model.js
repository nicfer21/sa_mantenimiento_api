import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Maintenance_Ordenes = db.define(
  "ordenes",
  {
    id_ordenes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_trabajadores: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    inicio_ordenes: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    fin_ordenes: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    schema: "maintenance",
    tableName: "ordenes",
    timestamps: true,
  }
);

export default Maintenance_Ordenes;
