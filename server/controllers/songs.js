import Song from "../models/Song.js";

export const getAllHandler = async (req, res) => {
  try {
    const options = { sort: { createdAt: 1 } };
    const cursor = await Song.find(options);
    if (!cursor)
      return res.status(400).send({ success: true, message: "No Data Found" });
    res.status(200).send({ success: true, data: cursor });
  } catch (error) {}
};

export const getOneHandler = async (req, res) => {
  try {
    const filter = { _id: req.params.getOne };
    const cursor = await Song.findOne(filter);
    if (!cursor)
      return res.status(400).send({ success: true, message: "No Data Found" });
    res.status(200).send({ success: true, data: cursor });
  } catch (error) {
    res.status(500).send({ success: true, message: error });
  }
};

export const saveHandler = async (req, res) => {
  try {
    const newSongs = new Song({
      name: req.body.name,
      imageURL: req.body.imageURL,
      songUrl: req.body.songUrl,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    });
    const savedSongs = await newSongs.save();
    res.status(200).send({ song: savedSongs });
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
    const result = await Song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
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
    const result = await Song.deleteOne(filter);
    if (result.deletedCount !== 1)
      return res
        .status(400)
        .send({ success: false, message: "Data Not Found" });
    res.status(200).send({ success: true, message: "Data Deleted" });
  } catch (error) {
    res.status(500).send({ success: true, message: error });
  }
};

export const getFavouritesSongsHandler = async (req, res) => {
  try {
    const query = req.query.songId;
    res.status(200).send(query);
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
