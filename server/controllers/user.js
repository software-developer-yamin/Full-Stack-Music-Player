import { admin } from "../config/firebase.config.js";
import User from "../models/User.js";

export const loginHandler = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).send({ message: "Invalid Token" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    const userExists = await User.findOne({ user_id: decodeValue.user_id });
    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else {
      updateUserData(decodeValue, req, res);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const newUserData = async (decodeValue, req, res) => {
  try {
    const newUser = new User({
      name: decodeValue.name,
      email: decodeValue.email,
      imageURL: decodeValue.picture,
      user_id: decodeValue.user_id,
      email_verfied: decodeValue.email_verified,
      role: "member",
      auth_time: decodeValue.auth_time,
    });
    const savedUser = await newUser.save();
    res.status(201).send({ user: savedUser });
  } catch (err) {
    res.status(500).send({ success: false, msg: err });
  }
};

const updateUserData = async (decodeValue, req, res) => {
  try {
    const filter = { user_id: decodeValue.user_id };
    const options = {
      upsert: true,
      new: true,
    };
    const result = await User.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const favouritesHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.userId };
    const songId = req.query;
    const result = await User.updateOne(filter, {
      $push: { favourites: songId },
    });
    res
      .status(200)
      .send({ success: true, message: "Song added to favourites" });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const getUsersHandler = async (req, res) => {
  try {
    const options = {
      sort: { createdAt: 1 },
    };
    const cursor = await User.find(options);
    if (cursor) {
      res.status(200).send({ success: true, data: cursor });
    } else {
      res.status(200).send({ success: true, message: "No Data Found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const getUserHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.userId };
    const userExists = await User.findOne({ _id: filter });
    if (!userExists)
      return res
        .status(400)
        .send({ success: false, message: "Invalid User ID" });
    res.status(200).send({ success: true, data: userExists });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const updateRoleHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.userId };
    const role = req.body.data.role;
    const options = {
      upsert: true,
      new: true,
    };
    const result = await User.findOneAndUpdate(filter, { role: role }, options);
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const deleteHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.userId };
    const result = await User.deleteOne(filter);
    if (result.deletedCount !== 1) {
      return res
        .status(400)
        .send({ success: false, message: "Data Not Found" });
    }
    res.status(200).send({ success: true, message: "Data Deleted" });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const removeFavouritesHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.userId };
    const songId = req.query;
    const result = await User.updateOne(filter, {
      $pull: { favourites: songId },
    });
    res
      .status(200)
      .send({ success: true, message: "Song removed from favourites" });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
