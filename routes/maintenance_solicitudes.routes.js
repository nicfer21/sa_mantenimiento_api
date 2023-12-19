import express from "express";

import {
  createOne,
  getAll,
  getAllCombobox,
  getAllList,
  getOne,
} from "../controller/maintenance_solicitudes.controller.js";

import { multerUpload } from "../src/multer.js";

const router = express.Router();

router.get("/", getAll);
router.get("/list/", getAllList);
router.get("/combobox/", getAllCombobox);

router.get("/:id", getOne);

router.post("/", multerUpload.single("file"), createOne);

export default router;
