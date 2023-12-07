import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Partes from "../model/equipment_partes.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Partes.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getAllUniPart = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT codigo_c,sub.* from view_sis_unid_part vsup inner join equipment.partes sub on vsup.id_partes = sub.id_partes where sub.id_unidades = ?;",
      {
        replacements: [req.params.id],
      }
    );
    res.json(rs[0]);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
