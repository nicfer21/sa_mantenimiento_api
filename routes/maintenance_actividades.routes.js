import express from "express";

import {
  createOne,
  getAll,
  getAllList,
  getCombobox,
  getOne,
} from "../controller/maintenance_actividades.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/list/", getAllList);
router.get("/combobox/", getCombobox);

router.get("/:id", getOne);

router.post("/", createOne);

export default router;
