import express from "express";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
  createWorker,
  updateWorker,
  getAllWorker,
} from "../controller/worker_usuarios.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/worker/:id", getAllWorker);
router.get("/:id", getOne);

router.post("/", createOne);
router.post("/worker/", createWorker);

router.put("/worker/", updateWorker);
router.put("/:id", updateOne);

router.delete("/:id", deleteOne);

export default router;

