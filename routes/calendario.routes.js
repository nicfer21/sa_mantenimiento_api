import express from "express";

import {
  getAllCalendar,
  getTodayCalendar,
} from "../controller/canendario.controller.js";

const router = express.Router();

router.get("/", getAllCalendar);
router.get("/:id", getTodayCalendar);

export default router;
