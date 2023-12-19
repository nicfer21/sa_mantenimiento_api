import express from "express";

import {
  createOne,
  deleteOne,
  getAll,
  getAllCombobox,
  getOne,
  getTrabajadoresAndUsuarios,
  updateOne,
} from "../controller/worker_trabajadores.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/all/", getTrabajadoresAndUsuarios);
router.get("/combobox/", getAllCombobox);

router.get("/:id", getOne);

router.post("/", createOne);

router.put("/:id", updateOne);

router.delete("/:id", deleteOne);

export default router;
