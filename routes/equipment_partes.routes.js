import express from "express";

import {
  getAll,
  getAllCombobox,
  getAllUniPart,
} from "../controller/equipment_partes.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/combobox/", getAllCombobox);

router.get("/unipart/:id", getAllUniPart);

export default router;
