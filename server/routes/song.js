import express from "express";
import {
  deleteHandler,
  getAllHandler,
  getFavouritesSongsHandler,
  getOneHandler,
  saveHandler,
  updateHandler,
} from "../controllers/songs.js";

const router = express.Router();

router.get("/getAll", getAllHandler);

router.get("/getOne/:getOne", getOneHandler);

router.post("/save", saveHandler);

router.put("/update/:updateId", updateHandler);

router.delete("/delete/:deleteId", deleteHandler);

router.get("/getFavouritesSongs", getFavouritesSongsHandler);

export default router;
