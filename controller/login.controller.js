import jwt from "jsonwebtoken";
import db from "../database/conexion.js";
import C_Sesiones from "../model/c_sesiones.model.js";

export const initLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const rs = await db.query(
      `select * from view_client_sesion vcs where vcs.dni = '${username}' and vcs.acceso ='${password}';`
    );
    const {
      id_trabajadores,
      dni,
      nombre,
      cargo,
      info,
      id_usuarios,
      correo,
      nivel,
      createdAt,
      updatedAt,
    } = rs[0][0];
    const token = getToken(
      id_trabajadores,
      dni,
      nombre,
      cargo,
      info,
      id_usuarios,
      correo,
      nivel,
      createdAt,
      updatedAt
    );
    await C_Sesiones.create({
      tipo: 1,
      id_usuarios: id_usuarios,
    });
    res.json({ messege: true, token: token });
  } catch (error) {
    res.json({ messege: false, token: error });
  }
};

// Generacion del token
const getToken = (
  id_trabajadores,
  dni,
  nombre,
  cargo,
  info,
  id_usuarios,
  correo,
  nivel,
  createdAt,
  updatedAt
) => {
  const payload = {
    id_trabajadores,
    dni,
    nombre,
    cargo,
    info,
    id_usuarios,
    correo,
    nivel,
    createdAt,
    updatedAt,
  };
  const secret = "mantenimiento";
  const options = { expiresIn: "1000h" }; // '30m' '1h' '24h' --- '168h' = 1semana
  return jwt.sign(payload, secret, options);
};
