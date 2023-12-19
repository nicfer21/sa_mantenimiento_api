import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Sol_Ord from "../model/maintenance_sol_ord.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Sol_Ord.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
