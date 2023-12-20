import express from "express";

import {
  createOne,
  getAll,
  getAllList,
  getOne,
} from "../controller/maintenance_ordenes.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/list/", getAllList);
router.get("/:id", getOne);

router.post("/", createOne);

export default router;
