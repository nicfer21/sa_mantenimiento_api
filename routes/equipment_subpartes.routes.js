import express from "express";

import {
  getAll,
  getAllPartSub,
} from "../controller/equipment_subpartes.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/partsub/:id", getAllPartSub);

export default router;
