import express from "express";

import { getAll } from "../controller/maintenance_sol_ord.controller.js";

const router = express.Router();

router.get("/", getAll);

export default router;
