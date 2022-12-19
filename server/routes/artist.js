import express from "express";
import {
  deleteHandler,
  getAllHandler,
  getOneHandler,
  saveHandler,
  updateHandler,
} from "../controllers/artists.js";

const router = express.Router();

router.get("/getAll", getAllHandler);

router.get("/getOne/:getOne", getOneHandler);

router.post("/save", saveHandler);

router.put("/update/:updateId", updateHandler);

router.delete("/delete/:deleteId", deleteHandler);

export default router;
