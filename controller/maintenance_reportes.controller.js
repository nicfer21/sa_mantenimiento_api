import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Reportes from "../model/maintenance_reportes.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Reportes.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
