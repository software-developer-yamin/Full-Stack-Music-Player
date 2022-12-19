import Album from "../models/album.js";

export const getAllHandler = async (req, res) => {
  try {
    const options = { sort: { createdAt: 1 } };
    const cursor = await Album.find(options);
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
    const cursor = await Album.findOne(filter);
    if (!cursor)
      return res.status(400).send({ success: true, message: "No Data Found" });
    res.status(200).send({ success: true, data: cursor });
  } catch (error) {
    res.status(500).send({ success: true, message: error });
  }
};

export const updateHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    const result = await Album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );
    res.status(200).send({ album: result });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const saveHandler = async (req, res) => {
  try {
    const newAlbum = new Album({
      name: req.body.name,
      imageURL: req.body.imageURL,
    });
    const savedAlbum = await newAlbum.save();
    res.status(200).send({ album: savedAlbum });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const deleteHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.deleteId };
    const result = await Album.deleteOne(filter);
    if (result.deletedCount !== 1)
      return res
        .status(400)
        .send({ success: false, message: "Data Not Found" });
    res.status(200).send({ success: true, message: "Data Deleted" });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
