import express from "express";

import {
  getAll,
  getCombobox,
  getOneCode,
  getOneData,
  getView_Sis_Unid_Ubic,
} from "../controller/equipment_unidades.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/list/", getView_Sis_Unid_Ubic);
router.get("/combobox/", getCombobox);

router.get("/:id", getOneData);
router.get("/code/:id", getOneCode);

export default router;
