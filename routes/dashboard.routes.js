import express from "express";

import {
  getAllSupervisor,
  getPropiusData,
} from "../controller/dashboard.controller.js";

const router = express.Router();

router.get("/", getAllSupervisor);

router.get("/:id", getPropiusData);

export default router;
