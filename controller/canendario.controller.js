import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";

export const getAllCalendar = async (req, res) => {
  try {
    const rs = await db.query(
      "( SELECT concat('o', id_ordenes) as id, estado, inicio_ordenes as fecha, fin_ordenes as end from maintenance.ordenes UNION SELECT concat('s', ms.id_solicitudes) as id, COALESCE( CASE WHEN mso.id_sol_ord IS NOT NULL THEN true ELSE false END, false ) as estado, ms.fecha as fecha, null from maintenance.solicitudes ms LEFT join maintenance.sol_ord mso on ms.id_solicitudes = mso.id_solicitudes ) order by fecha;"
    );
    res.json(rs[0]);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getTodayCalendar = async (req, res) => {
  try {
    const rs = await db.query(
      " (SELECT concat('o', id_ordenes) as id, concat('Orden de Mantenimiento nro : ', id_ordenes) as titulo, estado, inicio_ordenes as fecha from maintenance.ordenes where date(inicio_ordenes ) = ? UNION SELECT concat('s', ms.id_solicitudes) as id, concat('Solicitud de Mantenimiento nro : ', ms.id_solicitudes ) as titulo, COALESCE( CASE WHEN mso.id_sol_ord IS NOT NULL THEN true ELSE false END, false ) as estado, ms.fecha as fecha from maintenance.solicitudes ms LEFT join maintenance.sol_ord mso on ms.id_solicitudes = mso.id_solicitudes where date(ms.fecha ) = ? ) order by fecha;",
      {
        replacements: [req.params.id, req.params.id],
      }
    );
    res.json(rs[0]);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
