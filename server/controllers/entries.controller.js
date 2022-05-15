const { initEntries, newEntry, updateEntry, removEntry } = require('../service/entries.service');

const getEntries = async (req, res) => {
  try {
    const id = req.params.user_id;
    const entries = await initEntries(id);
    return res.json(entries);
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

const createEntry = async (req, res) => {
  try {
    const { userId, title } = req.body;
    const img = req.files.file;
    console.log(userId, title, img);
    await newEntry(userId, title, img);
    const entries = await initEntries(userId);
    return res.json(entries);
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

const editEntry = async (req, res) => {
  try {
    const { entryId, newTitle, id } = req.body;
    await updateEntry(entryId, newTitle);
    const entries = await initEntries(id);
    return res.json(entries);
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { entryId, userId } = req.body;
    await removEntry(entryId);
    const entries = await initEntries(userId);
    return res.json(entries);
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

module.exports = {
  getEntries,
  createEntry,
  editEntry,
  deleteEntry,
};
