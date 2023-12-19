import express from "express";
import morgan from "morgan";
import cors from "cors";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

import db from "./database/conexion.js";

import { PORT } from "./src/config.js";

import LoginRoutes from "./routes/login.routes.js";

import M_TrabajadoresRoutes from "./routes/worker_trabajadores.routes.js";
import C_UsuariosRoutes from "./routes/worker_usuarios.routes.js";
import C_SesionesRoutes from "./routes/worker_sesiones.routes.js";

import EquipmentSistemas from "./routes/equipment_sistemas.routes.js";
import EquipmentUnidades from "./routes/equipment_unidades.routes.js";
import EquipmentPartes from "./routes/equipment_partes.routes.js";
import EquipmentSubpartes from "./routes/equipment_subpartes.routes.js";

import MaintenanceUbicaciones from "./routes/maintenance_ubicaciones.routes.js";
import Maintenance_Solicitudes from "./routes/maintenance_solicitudes.routes.js";
import Maintenance_Actividades from "./routes/maintenance_actividades.routes.js";
import Maintenance_Ordenes from "./routes/maintenance_ordenes.routes.js";
import Maintenance_Act_Ord from "./routes/maintenance_act_ord.routes.js";
import Maintenance_Sol_Ord from "./routes/maintenance_sol_ord.routes.js";
import Maintenance_Reportes from "./routes/maintenance_reportes.routes.js";

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
        return res.json({ message: "Token inválido", type: false });
      }
      next();
    });
  } else {
    res.json({ message: "Se requiere iniciar sesion", type: false });
  }
});

app.get("/prueba/", (req, res) => [
  res.json({
    messege: "Token valido",
    type: true,
  }),
]);

app.use("/m_trabajadores/", M_TrabajadoresRoutes);
app.use("/c_usuarios/", C_UsuariosRoutes);
app.use("/c_sesiones/", C_SesionesRoutes);

app.use("/e_sistemas/", EquipmentSistemas);
app.use("/e_unidades/", EquipmentUnidades);
app.use("/e_partes/", EquipmentPartes);
app.use("/e_subpartes/", EquipmentSubpartes);

app.use("/m_ubicaciones/", MaintenanceUbicaciones);
app.use("/m_solicitudes/", Maintenance_Solicitudes);
app.use("/m_actividades/", Maintenance_Actividades);
app.use("/m_ordenes/", Maintenance_Ordenes);
app.use("/m_act_ord/", Maintenance_Act_Ord);
app.use("/m_sol_ord/", Maintenance_Sol_Ord);
app.use("/m_reportes/", Maintenance_Reportes);

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
