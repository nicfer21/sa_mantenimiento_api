import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Ordenes from "../model/maintenance_ordenes.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Ordenes.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
