import db from "../database/conexion.js";
import { DataTypes } from "sequelize";

const Maintenance_Solicitudes = db.define(
  "solicitudes",
  {
    id_solicitudes: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    asunto: {
      type: DataTypes.STRING(120),
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
    fecha: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    id_trabajadores: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_unidades: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    schema: "maintenance",
    tableName: "solicitudes",
    timestamps: true,
  }
);

export default Maintenance_Solicitudes;

/* id_solicitudes serial4 NOT NULL,
	asunto varchar(120) NULL,
	descripcon text NULL,
	imagen varchar(120) NULL,
	info json NULL,
	fecha timestamptz NULL,
	id_trabajadores int4 NULL,
	id_unidades int4 NULL, */
