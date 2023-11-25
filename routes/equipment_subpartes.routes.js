import express from "express";

import { getAll } from "../controller/equipment_subpartes.controller.js";

const router = express.Router();

router.get("/", getAll);

export default router;
