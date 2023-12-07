import { QueryTypes } from "sequelize";
import Subpartes from "../model/equipment_subpartes.model.js";
import db from "../database/conexion.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Subpartes.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getAllPartSub = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT vsups.codigo_c, sub.* from view_sis_unid_part_subpart vsups inner join equipment.subpartes sub on vsups.id_subpartes = sub.id_subpartes  where sub.id_partes  = ?;",
      {
        type: QueryTypes.SELECT,
        replacements: [req.params.id],
      }
    );
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
