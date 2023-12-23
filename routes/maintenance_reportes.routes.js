import express from "express";

import {
  createOne,
  getAll,
  getList,
  getOne,
} from "../controller/maintenance_reportes.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/list/", getList);

router.get("/:id", getOne);

router.post("/", createOne);

export default router;
