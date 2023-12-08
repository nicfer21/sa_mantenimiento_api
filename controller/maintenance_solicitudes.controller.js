import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Solicitudes from "../model/maintenance_solicitudes.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Solicitudes.findAll();
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
      "select vsu.unidades_nombre,vsu.codigo_c,mso.id_ordenes,wt.nombre ,ms.* from maintenance.solicitudes ms inner join view_sis_unid vsu on ms.id_unidades = vsu.id_unidades inner join worker.trabajadores wt on ms.id_trabajadores = wt.id_trabajadores  left join maintenance.sol_ord mso on ms.id_solicitudes = mso.id_ordenes order by mso.id_ordenes NULLS FIRST, ms.fecha ASC ;"
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
    const rs = await db.query(
      "SELECT mso.id_ordenes,wt.cargo,wt.nombre,vsu.unidades_nombre,vsu.codigo_c,vsu.sistemas_nombre, vsu.ubicacion_nombre,ms.* from maintenance.solicitudes ms inner join worker.trabajadores wt on ms.id_trabajadores = wt.id_trabajadores INNER JOIN view_sis_unid_ubic vsu on vsu.id_unidades = ms.id_unidades LEFT join maintenance.sol_ord mso on mso.id_solicitudes = ms.id_solicitudes where ms.id_solicitudes = ?;",
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

export const createOne = async (req, res) => {
  try {
    const data = {
      asunto: req.body.asunto,
      descripcion: req.body.descripcion,
      imagen: req.file.filename,
      info: JSON.parse(req.body.info),
      fecha: req.body.fecha,
      id_trabajadores: req.body.id_trabajadores,
      id_unidades: req.body.id_unidades,
    };

    await Solicitudes.create(data);

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
