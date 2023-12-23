import express from "express";

import {
  createOne,
  getAll,
  getAllCombobox,
  getAllList,
  getOne,
  getOneForReport,
} from "../controller/maintenance_ordenes.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/list/", getAllList);
router.get("/:id", getOne);
router.get("/oneforreport/:id", getOneForReport);
router.get("/combobox/:id", getAllCombobox);

router.post("/", createOne);

export default router;
