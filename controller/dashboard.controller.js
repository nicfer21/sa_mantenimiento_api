import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";

export const getAllSupervisor = async (req, res) => {
  try {
    const recSolicitudes = await db.query(
      "select COUNT(ms.id_solicitudes) as cantidad, concat(vsu.codigo_c,' - ', vsu.unidades_nombre) as unidad from maintenance.solicitudes ms inner join view_sis_unid vsu on ms.id_unidades = vsu.id_unidades where concat( EXTRACT( MONTH from date_trunc('month', date(ms.fecha at time zone'America/Lima') ) ),'-', EXTRACT( YEAR from date_trunc('year', date(ms.fecha at time zone'America/Lima') ) ) ) = concat( EXTRACT( MONTH from date_trunc('month', date(now() at time zone'America/Lima')) ),'-', EXTRACT( YEAR from date_trunc('year', date(now() at time zone'America/Lima')) ) ) GROUP by vsu.codigo_c, vsu.unidades_nombre;  "
    );

    const recSolicitudesAll = await db.query(
      "select COUNT(ms.id_solicitudes) as cantidad, concat(vsu.codigo_c,' - ', vsu.unidades_nombre) as unidad from maintenance.solicitudes ms inner join view_sis_unid vsu on ms.id_unidades = vsu.id_unidades  GROUP by vsu.codigo_c, vsu.unidades_nombre order by cantidad desc;  "
    );

    const recOrdenesHoy = await db.query(
      "SELECT concat('o', mo.id_ordenes) as id, concat('Orden de Mantenimiento nro : ', mo.id_ordenes) as titulo, mo.estado, mo.inicio_ordenes at time zone'America/Lima'as fecha, wt.nombre, wt.cargo, COUNT(mao.id_act_ord) as actividades, mo.id_ordenes as jump from maintenance.ordenes mo inner join worker.trabajadores wt on mo.id_trabajadores = wt.id_trabajadores inner join maintenance.act_ord mao on mo.id_ordenes = mao.id_ordenes where date(inicio_ordenes at time zone'America/Lima') =(SELECT date(now()at time zone'America/Lima'))GROUP by mo.id_ordenes, wt.nombre, wt.cargo order by fecha asc;"
    );

    const countOrdenToday = await db.query(
      "SELECT COUNT(mo.id_ordenes) FROM maintenance.ordenes mo WHERE date(mo.inicio_ordenes at time zone'America/Lima') = date(now() at time zone'America/Lima')"
    );
    const countReportToday = await db.query(
      " SELECT COUNT(*) from maintenance.reportes mr WHERE date(mr.inicio_reportes at time zone'America/Lima') = date(now() at time zone'America/Lima')"
    );

    const duracionOrdenToday = await db.query(
      "SELECT COALESCE(sum(ma.duracion),0) as ordDur from maintenance.ordenes mo inner join maintenance.act_ord mao on mo.id_ordenes = mao.id_ordenes inner join maintenance.actividades ma on mao.id_actividades = ma.id_actividades where date(mo.inicio_ordenes at time zone'America/Lima') = date(now() at time zone'America/Lima');"
    );
    const duracionReportToday = await db.query(
      "SELECT COALESCE(sum(mr.duracion_reportes),0) as repDur from maintenance.reportes mr WHERE date(mr.inicio_reportes at time zone'America/Lima') = date(now() at time zone'America/Lima');"
    );

    const cantidadActividades = await db.query(
      `SELECT ( CASE WHEN tipos ='1'THEN'Correctivo'WHEN tipos ='2'THEN'Preventivo tiempo'WHEN tipos ='3'THEN'Preventivo uso'WHEN tipos ='4'THEN'Predictivo'WHEN tipos ='5'THEN'Oportunidad'WHEN tipos ='6'THEN'Detección de fallas'WHEN tipos ='7'THEN'Modificación'WHEN tipos ='8'THEN'Reparación General'WHEN tipos ='9'THEN'Reemplazo'ELSE tipos END ) AS"Tipo", cantidad as"Nro Actividades",'hsl(145, 50%, 50%)'as"Nro ActividadesColor"from ( SELECT tipos_tabla.tipos, COALESCE(tipos_contados.contador, 0) as cantidad FROM ( SELECT unnest( ARRAY ['1', '2', '3', '4', '5', '6', '7', '8', '9']) as tipos ) tipos_tabla LEFT JOIN ( SELECT ma.tipo, count(*) as contador FROM maintenance.ordenes mo INNER JOIN maintenance.act_ord mao ON mo.id_ordenes = mao.id_ordenes INNER JOIN maintenance.actividades ma ON mao.id_actividades = ma.id_actividades WHERE concat( EXTRACT( MONTH from date_trunc('month', date(mo.inicio_ordenes at time zone'America/Lima') ) ),'-', EXTRACT( YEAR from date_trunc('year', date(mo.inicio_ordenes at time zone'America/Lima') ) ) ) = concat( EXTRACT( MONTH from date_trunc('month', date(now() at time zone'America/Lima')) ),'-', EXTRACT( YEAR from date_trunc('year', date(now() at time zone'America/Lima')) ) ) GROUP BY ma.tipo ) tipos_contados ON tipos_tabla.tipos = tipos_contados.tipo ) as table_search;`
    );

    const countOrdenMonth = await db.query(
      "SELECT COUNT(*) from maintenance.ordenes mo where concat( EXTRACT( MONTH from date_trunc('month', date(mo.inicio_ordenes at time zone'America/Lima') ) ),'-', EXTRACT( YEAR from date_trunc('year', date(mo.inicio_ordenes at time zone'America/Lima') ) ) ) = concat( EXTRACT( MONTH from date_trunc('month', date(now() at time zone'America/Lima')) ),'-', EXTRACT( YEAR from date_trunc('year', date(now() at time zone'America/Lima')) ) );"
    );
    const countReportMonth = await db.query(
      "SELECT COUNT(*) from maintenance.reportes mr where concat( EXTRACT( MONTH from date_trunc('month', date(mr.inicio_reportes at time zone'America/Lima') ) ),'-', EXTRACT( YEAR from date_trunc('year', date(mr.inicio_reportes at time zone'America/Lima') ) ) ) = concat( EXTRACT( MONTH from date_trunc('month', date(now() at time zone'America/Lima')) ),'-', EXTRACT( YEAR from date_trunc('year', date(now() at time zone'America/Lima')) ) );"
    );

    const data = {
      recSolicitudes: recSolicitudes[0],
      recSolicitudesAll: recSolicitudesAll[0],
      recOrdenesHoy: recOrdenesHoy[0],
      countOrdenToday: parseInt(countOrdenToday[0][0].count),
      countReportToday: parseInt(countReportToday[0][0].count),
      duracionOrdenToday: parseFloat(duracionOrdenToday[0][0].orddur),
      duracionReportToday: parseFloat(duracionReportToday[0][0].repdur),
      cantidadActividades: cantidadActividades[0],
      countOrdenMonth: parseInt(countOrdenMonth[0][0].count),
      countReportMonth: parseInt(countReportMonth[0][0].count),
    };

    res.json(data);
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};

export const getPropiusData = async (req, res) => {
  try {
    const recOrdenesHoy = await db.query(
      "SELECT concat('o', mo.id_ordenes) as id, concat('Orden de Mantenimiento nro : ', mo.id_ordenes) as titulo, mo.estado, mo.inicio_ordenes at time zone'America/Lima'as fecha, wt.nombre, wt.cargo, COUNT(mao.id_act_ord) as actividades, mo.id_ordenes as jump from maintenance.ordenes mo inner join worker.trabajadores wt on mo.id_trabajadores = wt.id_trabajadores inner join maintenance.act_ord mao on mo.id_ordenes = mao.id_ordenes where date(inicio_ordenes at time zone'America/Lima') =(SELECT date(now()at time zone'America/Lima')) and wt.id_trabajadores = ?  GROUP by mo.id_ordenes, wt.nombre, wt.cargo order by fecha asc;",
      {
        replacements: [req.params.id],
      }
    );

    const countOrdenToday = await db.query(
      "SELECT COUNT(mo.id_ordenes) FROM maintenance.ordenes mo WHERE date(mo.inicio_ordenes at time zone'America/Lima') = date(now() at time zone'America/Lima') and mo.id_trabajadores = ?;",
      {
        replacements: [req.params.id],
      }
    );
    const countReportToday = await db.query(
      "SELECT COUNT(*) from maintenance.reportes mr inner join maintenance.ordenes mo on mr.id_ordenes = mo.id_ordenes WHERE date(mr.inicio_reportes at time zone'America/Lima') = date(now() at time zone'America/Lima') and mo.id_trabajadores = ?;",
      {
        replacements: [req.params.id],
      }
    );

    const duracionOrdenToday = await db.query(
      "SELECT COALESCE(sum(ma.duracion),0) as ordDur from maintenance.ordenes mo inner join maintenance.act_ord mao on mo.id_ordenes = mao.id_ordenes inner join maintenance.actividades ma on mao.id_actividades = ma.id_actividades where date(mo.inicio_ordenes at time zone'America/Lima') = date(now() at time zone'America/Lima') and mo.id_trabajadores = ?;",
      {
        replacements: [req.params.id],
      }
    );
    const duracionReportToday = await db.query(
      "SELECT COALESCE(sum(mr.duracion_reportes),0) as repDur from maintenance.reportes mr inner join maintenance.ordenes mo on mr.id_ordenes = mo.id_ordenes WHERE date(mr.inicio_reportes at time zone'America/Lima') = date(now() at time zone'America/Lima') and mo.id_trabajadores = ?;",
      {
        replacements: [req.params.id],
      }
    );

    const countOrdenMonth = await db.query(
      "SELECT COUNT(*) from maintenance.ordenes mo where concat( EXTRACT( MONTH from date_trunc('month', date(mo.inicio_ordenes at time zone'America/Lima') ) ),'-', EXTRACT( YEAR from date_trunc('year', date(mo.inicio_ordenes at time zone'America/Lima') ) ) ) = concat( EXTRACT( MONTH from date_trunc('month', date(now() at time zone'America/Lima')) ),'-', EXTRACT( YEAR from date_trunc('year', date(now() at time zone'America/Lima')) ) ) and mo.id_trabajadores = ?;",
      {
        replacements: [req.params.id],
      }
    );
    const countReportMonth = await db.query(
      "SELECT COUNT(*) from maintenance.reportes mr inner join maintenance.ordenes mo on mr.id_ordenes = mo.id_ordenes where concat( EXTRACT( MONTH from date_trunc('month', date(mr.inicio_reportes at time zone'America/Lima') ) ),'-', EXTRACT( YEAR from date_trunc('year', date(mr.inicio_reportes at time zone'America/Lima') ) ) ) = concat( EXTRACT( MONTH from date_trunc('month', date(now() at time zone'America/Lima')) ),'-', EXTRACT( YEAR from date_trunc('year', date(now() at time zone'America/Lima')) ) ) and mo.id_trabajadores = ?;",
      {
        replacements: [req.params.id],
      }
    );

    const data = {
      recOrdenesHoy: recOrdenesHoy[0],
      countOrdenToday: parseInt(countOrdenToday[0][0].count),
      countReportToday: parseInt(countReportToday[0][0].count),
      duracionOrdenToday: parseFloat(duracionOrdenToday[0][0].orddur),
      duracionReportToday: parseFloat(duracionReportToday[0][0].repdur),
      countOrdenMonth: parseInt(countOrdenMonth[0][0].count),
      countReportMonth: parseInt(countReportMonth[0][0].count),
    };

    res.json(data);
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};
