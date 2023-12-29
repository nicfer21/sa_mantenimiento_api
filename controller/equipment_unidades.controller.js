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

export const getDiagram = async (req, res) => {
  try {
    let nodes = [];
    let edges = [];

    const rs = await db.query(
      "SELECT es.codigo_s as sistemas_codigo, es.nombre as sistemas_nombre, eu.codigo_s as unidades_codigo, concat(es.codigo_s,'-', eu.codigo_s) as unidades_codigo_c, eu.nombre as unidades_nombre, ep.codigo_s as partes_codigo, concat(es.codigo_s,'-', eu.codigo_s,'-', ep.codigo_s) as partes_codigo_c, ep.nombre as partes_nombre, ep.id_partes from equipment.unidades eu inner join equipment.sistemas es on eu.id_sistemas = es.id_sistemas inner join equipment.partes ep on eu.id_unidades = ep.id_unidades where eu.id_unidades = ? order by ep.id_partes;",
      {
        type: QueryTypes.SELECT,
        replacements: [req.params.id],
      }
    );

    const rs2 = await db.query(
      "SELECT concat('Nro de Subpartes : ',COUNT(*)) as cantidad, id_partes from view_sis_unid_part_subpart where id_unidades = ? GROUP by id_partes order by id_partes asc;",
      {
        type: QueryTypes.SELECT,
        replacements: [req.params.id],
      }
    );

    const largo = rs.length;
    const posSistemas = (200 * (largo - 1)) / 2;

    nodes[0] = {
      id: "1",
      type: "input",
      data: {
        label: rs[0].sistemas_codigo + " / " + rs[0].sistemas_nombre,
      },
      position: { x: posSistemas, y: 0 },
      style: {
        background: "#00aaff",
        color: "#333",
        border: "1px solid #222138",
        fontSize: "14px",
        fontWeight: "bold",
      },
    };
    nodes[1] = {
      id: "2",
      data: {
        label: rs[0].unidades_codigo_c + " / " + rs[0].unidades_nombre,
      },
      position: { x: posSistemas, y: 100 },
      style: {
        background: "#b489ac",
        color: "#333",
        border: "1px solid #222138",
        fontSize: "12px",
        fontWeight: "bold",
      },
    };

    rs.map((rows, iter) => {
      const id = iter + 2;
      const posX = iter * 200;

      nodes[id] = {
        id: `${id + 1}`,
        type: "output",
        data: {
          label: rows.partes_codigo_c + " / " + rows.partes_nombre,
        },
        position: { x: posX, y: 250 },
      };

      rs2.map((sub, iterSub) => {
        if (parseInt(sub.id_partes) === parseInt(rows.id_partes)) {
          const newId = id + 20;
          nodes[newId] = {
            id: `${newId + 1}`,
            type: "output",
            data: {
              label: sub.cantidad,
            },
            position: { x: posX, y: 350 },
            style: {
              background: "#ff7b5a",
              color: "#333",
              border: "1px solid #222138",
            },
          };
        }
      });
    });

    edges[0] = {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "smoothstep",
    };

    rs.map((rows, iter) => {
      const id = iter + 1;

      edges[id] = {
        id: `e2-${id + 2}`,
        source: "2",
        target: `${id + 2}`,
        type: "smoothstep",
      };
    });

    const dataNodes = nodes.filter((elemento) => elemento !== null);
    const dataEdges = edges.filter((elemento) => elemento !== null);

    const dataReturn = {
      nodes: dataNodes,
      edges: dataEdges,
    };
    res.json(dataReturn);
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
