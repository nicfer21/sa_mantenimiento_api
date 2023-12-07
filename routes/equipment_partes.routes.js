import express from "express";

import {
  getAll,
  getAllUniPart,
} from "../controller/equipment_partes.controller.js";

const router = express.Router();

router.get("/", getAll);

router.get("/unipart/:id", getAllUniPart);

export default router;
