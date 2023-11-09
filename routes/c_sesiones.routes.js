import express from "express";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../controller/c_sesiones.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

router.post("/", createOne);

router.put("/:id", updateOne);

router.delete("/:id", deleteOne);

export default router;
