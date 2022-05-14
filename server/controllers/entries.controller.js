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
    const { userId, newTitle } = req.body;
    const entries = await newEntry(userId, newTitle);
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
    const { entryId, newTitle } = req.body;
    const entries = await updateEntry(entryId, newTitle);
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
    const { entryId } = req.body;
    const entries = await removEntry(entryId);
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
