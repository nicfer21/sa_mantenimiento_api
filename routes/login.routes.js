import express from "express";
import { initLogin } from "../controller/login.controller.js";

const router = express.Router();

router.post("/", initLogin);

export default router;
