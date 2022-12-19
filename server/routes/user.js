import express from "express";
import {
  deleteHandler,
  favouritesHandler,
  getUserHandler,
  getUsersHandler,
  loginHandler,
  removeFavouritesHandler,
  updateRoleHandler,
} from "../controllers/user.js";

const router = express.Router();

router.get("/login", loginHandler);

router.put("/favourites/:userId", favouritesHandler);

router.get("/getUsers", getUsersHandler);

router.get("/getUser/:userId", getUserHandler);

router.put("/updateRole/:userId", updateRoleHandler);

router.delete("/delete/:userId", deleteHandler);

router.put("/removeFavourites/:userId", removeFavouritesHandler);

export default router;
