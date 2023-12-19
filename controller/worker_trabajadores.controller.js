import { QueryTypes } from "sequelize";
import db from "../database/conexion.js";
import M_Trabajadores from "../model/worker_trabajadores.models.js";

export const getAll = async (req, res) => {
  try {
    const rs = await M_Trabajadores.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getTrabajadoresAndUsuarios = async (req, res) => {
  try {
    const rs = await db.query(
      'select id_trabajadores,dni,nombre,cargo,correo,nivel,"createdAt" from view_client_sesion vcs;'
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
      "Select wt.id_trabajadores as value, concat( CASE WHEN wu.nivel = 3 THEN'Ejecutor'WHEN wu.nivel = 2 THEN'Supervisor'WHEN wu.nivel = 1 THEN'Administrador'ELSE'Error'End,' - ', wt.nombre,' - ', wt.cargo ) as label FROM worker.trabajadores wt inner join worker.usuarios wu on wt.id_trabajadores = wu.id_trabajadores order by wu.nivel DESC,wu.id_trabajadores ASC;",
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
    const rs = await M_Trabajadores.findOne({
      where: {
        id_trabajadores: req.params.id,
      },
    });
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const createOne = async (req, res) => {
  try {
    await M_Trabajadores.create(req.body);
    res.json({
      messege: true,
    });
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};

export const updateOne = async (req, res) => {
  try {
    await M_Trabajadores.update(req.body, {
      where: {
        id_trabajadores: req.params.id,
      },
    });
    res.json({
      messege: true,
    });
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    await M_Trabajadores.destroy({
      where: {
        id_trabajadores: req.params.id,
      },
    });
    res.json({
      messege: true,
    });
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};
