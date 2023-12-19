import express from "express";

import { getAll } from "../controller/mainenance_act_ord.controller.js";

const router = express.Router();

router.get("/", getAll);

export default router;
