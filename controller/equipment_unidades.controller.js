import Unidades from "../model/equipment_unidades.model.js";
import db from "../database/conexion.js";
import { QueryTypes } from "sequelize";

export const getAll = async (req, res) => {
  try {
    const rs = await Unidades.findAll({
      order: [["id_unidades", "ASC"]],
    });
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getOneData = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT vsu.codigo_c, un.*,ub.nombre as ubicaciones_nombre from view_sis_unid vsu inner JOIN equipment.unidades un on vsu.id_unidades = un.id_unidades inner join maintenance.ubicaciones ub on un.id_ubicaciones = ub.id_ubicaciones WHERE un.id_unidades = ?;",
      {
        type: QueryTypes.SELECT,
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

export const getOneCode = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT * from public.view_sis_unid WHERE codigo_c = ?;",
      {
        type: QueryTypes.SELECT,
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

export const getView_Sis_Unid_Ubic = async (req, res) => {
  try {
    const rs = await db.query(
      'SELECT * from "public".view_sis_unid_ubic order by id_unidades;'
    );
    res.json(rs[0]);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getCombobox = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT id_unidades as value,concat(codigo_c,' - ',unidades_nombre) as label from view_sis_unid_ubic order by id_unidades;"
    );
    res.json(rs[0]);
  } catch (error) {
    res.json({ error: error });
  }
};
