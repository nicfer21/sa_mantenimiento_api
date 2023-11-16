import db from "../database/conexion.js";
import C_Usuarios from "../model/c_usuarios.model.js";
import M_Trabajadores from "../model/m_trabajadores.models.js";

export const getAll = async (req, res) => {
  try {
    const rs = await C_Usuarios.findAll();
    res.json(rs);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const rs = await C_Usuarios.findOne({
      where: {
        id_usuarios: req.params.id,
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
    await C_Usuarios.create(req.body);
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
    await C_Usuarios.update(req.body, {
      where: {
        id_usuarios: req.params.id,
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
    await C_Usuarios.destroy({
      where: {
        id_usuarios: req.params.id,
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

export const getAllWorker = async (req, res) => {
  try {
    const rs = await db.query(
      "select id_trabajadores,dni,nombre,cargo,info,id_usuarios,correo,nivel from view_client_sesion vcs where id_trabajadores = " +
        req.params.id +
        ";"
    );
    res.json(rs[0][0]);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const createWorker = async (req, res) => {
  try {
    const { dni, nombre, cargo, info, acceso, correo, nivel } = req.body;

    const reply = await M_Trabajadores.count({
      where: {
        dni: dni,
      },
    });

    if (reply === 1) {
      res.json({
        messege: false,
        cause: "El numero de DNI ya esta registrado",
        error: error,
      });
    } else {
      const rs = await M_Trabajadores.create(
        {
          dni: dni,
          nombre: nombre,
          cargo: cargo,
          info: info,
        },
        {
          returning: ["id_trabajadores"],
        }
      );
      const rs1 = await C_Usuarios.create(
        {
          acceso: acceso,
          correo: correo,
          nivel: nivel,
          id_trabajadores: rs.id_trabajadores,
        },
        {
          returning: ["id_usuarios"],
        }
      );
      res.json({
        messege: true,
      });
    }
  } catch (error) {
    res.json({
      messege: false,
      error: error,
    });
  }
};

export const updateWorker = async (req, res) => {
  try {
    const {
      id_trabajadores,
      dni,
      nombre,
      cargo,
      info,
      id_usuarios,
      acceso,
      correo,
      nivel,
    } = req.body;

    await M_Trabajadores.update(
      { dni, nombre, cargo, info },
      {
        where: {
          id_trabajadores: id_trabajadores,
        },
      }
    );

    await C_Usuarios.update(
      { acceso, correo, nivel },
      { where: { id_usuarios: id_usuarios } }
    );

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
