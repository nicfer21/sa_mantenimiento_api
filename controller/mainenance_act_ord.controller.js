import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Act_Ord from "../model/maintenance_act_ord.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Act_Ord.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
