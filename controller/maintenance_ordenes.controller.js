import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Ordenes from "../model/maintenance_ordenes.model.js";
import Act_Ord from "../model/maintenance_act_ord.model.js";
import Sol_Ord from "../model/maintenance_sol_ord.model.js";

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

export const getAllList = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT mo.id_ordenes,wt.nombre,mo.inicio_ordenes,mo.estado  from maintenance.ordenes mo inner JOIN worker.trabajadores wt on mo.id_trabajadores = wt.id_trabajadores order by mo.estado::int, mo.inicio_ordenes;"
    );
    res.json(rs[0]);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getAllCombobox = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT mo.id_ordenes as value,concat('Orden de Mantenimiento nro ',mo.id_ordenes,' - ',mo.inicio_ordenes at time zone'America/Lima') as label from maintenance.ordenes mo inner join worker.trabajadores wt on mo.id_trabajadores = wt.id_trabajadores left join maintenance.reportes mr on mo.id_ordenes = mr.id_ordenes where mr.id_reportes is null AND wt.id_trabajadores = ? order by mo.inicio_ordenes asc;",
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

export const getOneForReport = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT mo.id_ordenes, mo.estado as estado_ordenes, mao.estado as estado_act_ord, mao.descripcion, mao.info, ma.id_actividades, ma.titulo, ma.duracion, ma.prioridad, ma.tipo, ma.variables from maintenance.ordenes mo inner join maintenance.act_ord mao on mo.id_ordenes = mao.id_ordenes inner join maintenance.actividades ma on mao.id_actividades = ma.id_actividades where mo.id_ordenes = ?;",
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

export const getOne = async (req, res) => {
  try {
    const id_ordenes = req.params.id;

    const rs1 = await db.query(
      "SELECT mr.id_reportes,mso.id_solicitudes,wt.id_trabajadores,wt.nombre,wt.cargo,mo.* from maintenance.ordenes mo inner join worker.trabajadores wt on mo.id_trabajadores = wt.id_trabajadores left join maintenance.reportes mr on mr.id_ordenes = mo.id_ordenes left join maintenance.sol_ord mso on mso.id_ordenes = mo.id_ordenes where mo.id_ordenes = ?;",
      {
        replacements: [id_ordenes],
        type: QueryTypes.SELECT,
      }
    );

    const rs2 = await db.query(
      "SELECT mao.id_act_ord,ac.*, vsup.codigo_c as codigo_partes, vsup.partes_nombre, vsuu.codigo_c as codigo_unidades, vsuu.unidades_nombre, vsuu.sistemas_nombre, vsuu.ubicacion_nombre from maintenance.actividades ac inner join view_sis_unid_part vsup on ac.id_partes = vsup.id_partes inner join view_sis_unid_ubic vsuu on vsup.id_unidades = vsuu.id_unidades inner join maintenance.act_ord mao on mao.id_actividades = ac.id_actividades inner join maintenance.ordenes mo on mo.id_ordenes = mao.id_ordenes  where mo.id_ordenes = ? order by mao.id_act_ord asc;",
      {
        replacements: [id_ordenes],
        type: QueryTypes.SELECT,
      }
    );

    const data = {
      part1: rs1[0],
      part2: rs2,
    };

    res.json(data);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const createOne = async (req, res) => {
  try {
    const data = req.body;

    const rs = await Ordenes.create(
      {
        estado: data.estado,
        descripcion: data.descripcion,
        id_trabajadores: data.id_trabajadores.value,
        inicio_ordenes: data.inicio_ordenes,
        fin_ordenes: data.fin_ordenes,
      },
      {
        returning: ["id_ordenes"],
      }
    );

    data.actividades.map(async (row) => {
      await Act_Ord.create({
        estado: false,
        id_actividades: row.id_actividades,
        id_ordenes: rs.id_ordenes,
      });
    });

    if (data.id_solicitudes != null) {
      await Sol_Ord.create({
        id_solicitudes: data.id_solicitudes.value,
        id_ordenes: rs.id_ordenes,
      });
    }

    res.json({ messege: true });
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};
