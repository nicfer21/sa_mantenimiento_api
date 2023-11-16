import express from "express";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  getTrabajadoresAndUsuarios,
  updateOne,
} from "../controller/m_trabajadores.controller.js";


const router = express.Router();

router.get("/", getAll);
router.get("/all/", getTrabajadoresAndUsuarios);

router.get("/:id", getOne);

router.post("/", createOne);

router.put("/:id", updateOne);

router.delete("/:id", deleteOne);

export default router;
