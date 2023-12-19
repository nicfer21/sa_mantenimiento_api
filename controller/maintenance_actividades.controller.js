import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Actividades from "../model/maintenance_actividades.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Actividades.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getAllList = async (req, res) => {
  try {
    const rs = await db.query(
      "select concat(vsup.codigo_c,' - ',vsup.partes_nombre)as parte ,vsup.unidades_nombre as unidad, ac.id_actividades,ac.titulo,ac.tipo,ac.prioridad from maintenance.actividades ac inner join view_sis_unid_part vsup on ac.id_partes = vsup.id_partes;",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getCombobox = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT ma.id_actividades as value , concat(vsup.codigo_c,' - ', vsup.partes_nombre,' - ', ma.titulo) as label from maintenance.actividades ma inner join view_sis_unid_part vsup on ma.id_partes = vsup.id_partes;",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT ac.*, vsup.codigo_c as codigo_partes, vsup.partes_nombre, vsuu.codigo_c as codigo_unidades, vsuu.unidades_nombre, vsuu.sistemas_nombre, vsuu.ubicacion_nombre from maintenance.actividades ac inner join view_sis_unid_part vsup on ac.id_partes = vsup.id_partes inner join view_sis_unid_ubic vsuu on vsup.id_unidades = vsuu.id_unidades where ac.id_actividades = ?;",
      {
        replacements: [req.params.id],
        type: QueryTypes.SELECT,
      }
    );
    res.json(rs[0]);
  } catch (error) {
    res.json({ error: error });
  }
};

export const createOne = async (req, res) => {
  try {
    await Actividades.create(req.body);
    res.json({
      messege: 1,
    });
  } catch (error) {
    res.json({
      messege: 0,
      error: error,
    });
  }
};
