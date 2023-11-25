import express from "express";

import { getAll } from "../controller/equipment_partes.controller.js";

const router = express.Router();

router.get("/", getAll);

export default router;
