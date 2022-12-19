import Artist from "../models/Artist.js";

export const getAllHandler = async (req, res) => {
  try {
    const options = { sort: { createdAt: 1 } };
    const cursor = await Artist.find(options);
    if (!cursor)
      return res.status(400).send({ success: false, message: "No Data Found" });
    res.status(200).send({ success: true, data: cursor });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const getOneHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.getOne };
    const cursor = await Artist.findOne(filter);
    if (!cursor)
      return res.status(400).send({ success: true, message: "No Data Found" });
    res.status(200).send({ success: true, data: cursor });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const saveHandler = async (req, res) => {
  try {
    const newArtist = new Artist({
      name: req.body.name,
      imageURL: req.body.imageURL,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
    });
    const savedArtist = await newArtist.save();
    res.status(201).send({ artist: savedArtist });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const updateHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    const result = await Artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );
    res.status(200).send({ artist: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const deleteHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.deleteId };
    const result = await Artist.deleteOne(filter);
    if (result.deletedCount !== 1)
      return res.status(200).send({ success: false, message: "Data Not Found" });
    res.status(200).send({ success: true, message: "Data Deleted" });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
