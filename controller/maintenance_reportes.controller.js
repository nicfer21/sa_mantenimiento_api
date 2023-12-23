import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import Reportes from "../model/maintenance_reportes.model.js";
import Ordenes from "../model/maintenance_ordenes.model.js";
import Act_Ord from "../model/maintenance_act_ord.model.js";

export const getAll = async (req, res) => {
  try {
    const rs = await Reportes.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getList = async (req, res) => {
  try {
    const rs = await db.query(
      "SELECT mr.id_reportes,concat('Orden de Mantenimiento Nro ',mo.id_ordenes) as titulo , mr.inicio_reportes,wt.nombre, mr.duracion_reportes, wt.id_trabajadores from maintenance.reportes mr inner join maintenance.ordenes mo on mr.id_ordenes = mo.id_ordenes inner join worker.trabajadores wt on mo.id_trabajadores = wt.id_trabajadores order by mr.inicio_reportes desc;"
    );
    res.json(rs[0]);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
export const getOne = async (req, res) => {
  const id_reportes = req.params.id;
  try {
    const dataReporte = await db.query(
      "SELECT mr.id_reportes,mr.descripcion, mr.inicio_reportes, mr.fin_reportes, mr.duracion_reportes, mo.id_ordenes, mo.inicio_ordenes, mo.fin_ordenes, wt.nombre, wt.cargo, mso.id_solicitudes from maintenance.reportes mr inner join maintenance.ordenes mo on mr.id_ordenes = mo.id_ordenes inner join worker.trabajadores wt on wt.id_trabajadores = mo.id_trabajadores left join maintenance.sol_ord mso on mso.id_ordenes = mo.id_ordenes where mr.id_reportes = ?;",
      {
        replacements: [id_reportes],
      }
    );
    const dataOrdenActividad = await db.query(
      "select mao.id_act_ord, mao.info, mao.id_actividades, mao.estado, ma.titulo, ma.procedimiento, ma.duracion, ma.tipo, ma.prioridad, ma.variables, vsup.partes_nombre, vsup.codigo_c, vsup.unidades_nombre, vsup.sistemas_nombre from maintenance.reportes mr inner join maintenance.ordenes mo on mr.id_ordenes = mo.id_ordenes inner join maintenance.act_ord mao on mao.id_ordenes = mo.id_ordenes inner join maintenance.actividades ma on mao.id_actividades = ma.id_actividades inner join view_sis_unid_part vsup on vsup.id_partes = ma.id_partes where mr.id_reportes = ? order by mao.id_act_ord asc;",
      {
        replacements: [id_reportes],
      }
    );

    const data = {
      part1: dataReporte[0][0],
      part2: dataOrdenActividad[0],
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
    console.log(data);
    data.dataVariable.map((row) => {
      console.log(row);
    });

    const dataReporte = {
      inicio_reportes: data.inicio_reportes,
      fin_reportes: data.fin_reportes,
      duracion_reportes: data.duracion,
      descripcion: data.descripcion,
      id_ordenes: data.id_ordenes,
    };

    await Reportes.create(dataReporte);
    await Ordenes.update(
      { estado: true },
      {
        where: {
          id_ordenes: data.id_ordenes,
        },
      }
    );

    const dataAct_Ord = await db.query(
      "SELECT mao.id_act_ord,ma.variables from maintenance.act_ord mao inner join maintenance.actividades ma on mao.id_actividades = ma.id_actividades WHERE mao.id_ordenes = ?;",
      {
        replacements: [data.id_ordenes],
      }
    );

    dataAct_Ord[0].map(async (row, iter) => {
      const id_act_ord = row.id_act_ord;
      let variables = {};
      Object.keys(row.variables).map(async (rowVar, iterVar) => {
        variables[rowVar] = data.dataVariable[iter][iterVar];
      });

      const dataFormaAct_Ord = {
        estado: true,
        info: variables,
      };

      await Act_Ord.update(dataFormaAct_Ord, {
        where: {
          id_act_ord: id_act_ord,
        },
      });
    });

    res.json({ messege: true });
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};
