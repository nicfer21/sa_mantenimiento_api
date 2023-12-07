import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Maintenance_Sol_Ord = db.define(
  "sol_ord",
  {
    id_sol_ord: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_solicitudes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_ordenes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    schema: "maintenance",
    tableName: "sol_ord",
    timestamps: true,
  }
);

export default Maintenance_Sol_Ord;
