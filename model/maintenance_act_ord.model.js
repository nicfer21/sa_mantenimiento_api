import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Maintenance_Act_Ord = db.define(
  "act_ord",
  {
    id_act_ord: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    id_actividades: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_ordenes: {
      type: DataTypes.INTEGER,
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
  },
  {
    schema: "maintenance",
    tableName: "act_ord",
    timestamps: true,
  }
);

export default Maintenance_Act_Ord;
