const { Entry } = require('../db/models');

async function initEntries(id) {
  const entries = await Entry.findAll({
    where: { user_id: id },
  });

  return entries;
}

async function updateEntry(entryId, newTitle) {
  const entries = await Entry.update(
    { title: newTitle },
    { where: { id: entryId } },
  );
  return entries;
}

async function newEntry(userId, newTitle) {
  const entries = await Entry.create({ title: newTitle, user_id: userId });
  return entries;
}

async function removEntry(entryId) {
  const entries = await Entry.destroy({ where: { id: entryId } });
  return entries;
}
module.exports = { initEntries, newEntry, updateEntry, removEntry };
