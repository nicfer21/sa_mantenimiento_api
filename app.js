import express from "express";
import morgan from "morgan";
import cors from "cors";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

import db from "./database/conexion.js";

import { PORT } from "./src/config.js";

import LoginRoutes from "./routes/login.routes.js";

import M_TrabajadoresRoutes from "./routes/m_trabajadores.routes.js";
import C_UsuariosRoutes from "./routes/c_usuarios.routes.js";
import C_SesionesRoutes from "./routes/c_sesiones.routes.js";

const app = express();
const port = PORT;
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Ruta de inicio
app.get("/", async (req, res) => {
  res.json({
    messege: "Conexion exitosa con Servicentro Avila mantenimiento api",
    state: await comprobacion(),
  });
});

//Login
app.use("/login/", LoginRoutes);

//Middleware de autenticacion
app.use((req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[0];
    jwt.verify(token, "mantenimiento", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido", type: 1 });
      }
      next();
    });
  } else {
    res.status(401).json({ message: "Se requiere iniciar sesion", type: 2 });
  }
});

app.get("/prueba/", (req, res) => [
  res.json({
    messege: true,
  }),
]);

app.use("/m_trabajadores/", M_TrabajadoresRoutes);
app.use("/c_usuarios/", C_UsuariosRoutes);
app.use("/c_sesiones/", C_SesionesRoutes);

// para acceder a las imagenes
app.use("/img/", express.static(join(CURRENT_DIR, "./uploads")));

//Ruta de error 404
app.use((req, res) => {
  //Si no encuentra la ruta manda error 404
  res.status(404).json({
    error: "404",
    message: "Ruta inexistente",
  });
});

app.listen(port, async () => {
  console.log(`Ready -> ${await comprobacion()}`);
});

const comprobacion = async () => {
  try {
    await db.authenticate();
    return "Clear";
  } catch (error) {
    return error;
  }
};
