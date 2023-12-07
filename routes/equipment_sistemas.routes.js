import express from "express";

import { getAll, getOne } from "../controller/equipment_sistemas.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

export default router;
