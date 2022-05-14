const router = require('express').Router();
const { getEntries, createEntry, editEntry, deleteEntry } = require('../controllers/entries.controller');

router.route('/:user_id')
  .get(getEntries);

router.route('/')
  .post(createEntry)
  .put(editEntry)
  .delete(deleteEntry);

module.exports = router;
